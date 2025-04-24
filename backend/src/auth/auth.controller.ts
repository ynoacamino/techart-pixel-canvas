import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SessionsService } from 'src/sessions/sessions.service';
import { Request, Response } from 'express';
import { Session, User } from '@prisma/client';
import { addDays } from 'src/common/utils/date.utils';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionsService: SessionsService,
    private configService: ConfigService,
  ) { }

  @Get('me')
  async me(@Req() req: Request, @Res() res: Response) {
    const sessionToken = req.cookies?.['session_token'];
    if (!sessionToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await this.sessionsService.getUserBySessionToken(sessionToken);
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    return res.json(user);
  }

  @Get('google/login')
  async checkSession(@Req() req: Request, @Res() res: Response) {
    console.log(req);
    const sessionToken = req.cookies?.['session_token'];
    if (!sessionToken) {
      return res.redirect('/auth/google/redirect');
    }
    const user = await this.sessionsService.getUserBySessionToken(sessionToken);
    if (!user) {
      return res.redirect('/auth/google/redirect');;
    }
    return res.redirect('/auth/me');
  }
  
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {} 
    

  @Get('google/logout')
  async googleLogout(@Req() req: Request, @Res() res: Response) {
    const sessionToken = req.cookies?.['session_token'];
    if (sessionToken) {
      const session = await this.sessionsService.getSessionByToken(sessionToken);
      if (session) {
        await this.sessionsService.revokeSession(session.id);
        res.clearCookie('session_token');
      }
    }
    return res.redirect(this.configService.get<string>('frontendUrl') || 'http://localhost:3000');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const userInReq = req.user;
    if (!userInReq) {
      throw new Error('No user found');
    }
    const user = await this.authService.validateUser(userInReq as User);
    const sessionToken = req.cookies?.['session_token'];

    let session: Session;
    if (sessionToken) {
      const existingSession = await this.sessionsService.getSessionByToken(sessionToken);
      if (existingSession) {
        session = existingSession;
      } else {
        session = await this.sessionsService.createSession({
          userId: user.id,
          userAgent: req.headers['user-agent'],
          ipAddress: req.ip,
        });
      }
    } else {
      session = await this.sessionsService.createSession({
        userId: user.id,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
      });
    }

    res.cookie('session_token', session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: addDays(new Date(), 7).getTime() - new Date().getTime(),
    });

    return res.redirect(this.configService.get<string>('frontendUrl') || 'http://localhost:3000');
  }
}
