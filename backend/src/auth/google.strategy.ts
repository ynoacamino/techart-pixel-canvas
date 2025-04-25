import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('clientId') || '',
      clientSecret: configService.get<string>('clientSecret') || '',
      callbackURL: configService.get<string>('callbackURL') || '',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const email = profile.emails?.at(0)?.value;
    const name = profile.displayName;
    const avatar = profile.photos?.at(0)?.value;
    if (!email) {
      return done(new Error('No email found'), undefined);
    }
    done(null, {
      email, name, avatar, accessToken, refreshToken,
    });
  }
}
