import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { OAuth2Strategy as Strategy, VerifyFunction, Profile } from "passport-google-oauth";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>("clientId") || '',
      clientSecret: configService.get<string>("clientSecret") || '',
      callbackURL: configService.get<string>("callbackURL") || '',
    })
  }

  async validate({
    accessToken,
    refreshToken,
    profile,
    done,
  }: {
    accessToken: string;
    refreshToken: string;
    profile: Profile;
    done: VerifyFunction;
    }) {
    const email = profile.emails?.at(0)?.value;
    if (!email) {
      return done(new Error("No email found"), null);
    }
    done(null, { email })
  }
}