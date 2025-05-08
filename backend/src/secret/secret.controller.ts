import { Controller, Get, Req, Res } from '@nestjs/common';
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
  async access(@Req() req: Request, @Res() res: Response) {
    const sessionToken = req.cookies?.session_token;
    const secretToken = req.cookies?.secret_token;
    let discoveredBy = await this.secretService.usersWithSecret();
    console.log('sessionToken', sessionToken);
    console.log('secretToken', secretToken);
    
    if (!sessionToken || !secretToken) {
      console.log('No session token or secret token');
      return res.json({ ok: false, discoveredBy });
    }

    const user = await this.sessionsService.getUserBySessionToken(sessionToken);

    if (!user) {
      return res.json({ ok: false, discoveredBy });
    }

    if (user.discTheSecret) {
      return res.json({ ok: true, discovered: true, discoveredBy, message: 'Already discovered' });
    }

    const isValid = await this.secretService.validateToken(user.id, secretToken);

    if (!isValid) {
      return res.json({ ok: false, discoveredBy });
    }
    discoveredBy += 1;
    return res.json({ ok: true, discoveredBy });
  }

}
