import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { SecretService } from './secret.service';
import { Request, Response } from 'express';
import { SessionsService } from '@/sessions/sessions.service';
import { addMinutes } from '@/common/utils/date.utils';

@Controller('secret')
export class SecretController {
  constructor(
    private secretService: SecretService,
    private sessionsService: SessionsService,
  ) { }
  @Get('generate')
  async generateSecret(@Req() req: Request, @Res() res: Response) {
    const sessionToken = req.cookies?.session_token;
    if (!sessionToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await this.sessionsService.getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (user.discTheSecret) {
      const discoveredBy = await this.secretService.usersWithSecret()
      return res.status(403).json({ ok: true, discovered: true, discoveredBy, message: 'Already discovered' });
    }

    const token = await this.secretService.createToken(user.id);

    res.cookie('secret_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: addMinutes(new Date(), 5).getTime() - new Date().getTime(),
    });

    return res.json({ ok: true });
  }

  @Get('a-random-endpoint-that-users-should-not-access-easily')
  async access(@Req() req: Request, @Query('token') token: string) {
    const sessionToken = req.cookies?.session_token;
    const secretToken = req.cookies?.secret_token;
    
    if (!sessionToken || !secretToken || token !== secretToken) {
      return { ok: false };
    }

    const user = await this.sessionsService.getUserBySessionToken(sessionToken);

    if (!user) {
      return { ok: false };
    }

    const discoveredBy = await this.secretService.usersWithSecret();

    if (user.discTheSecret) {
      return { ok: true, discovered: true, discoveredBy, message: 'Already discovered' };
    }

    const isValid = await this.secretService.validateToken(user.id, secretToken);

    if (!isValid) {
      return { ok: false };
    }

    return { ok: true, discoveredBy };
  }

}
