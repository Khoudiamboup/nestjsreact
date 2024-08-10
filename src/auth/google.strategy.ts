import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) {
    try {
      const { name, emails } = profile;
      const user = await this.userService.findOrCreate({
        googleId: profile.id,
        nom: name.givenName,
        prenom: name.familyName,
        email: emails[0].value,
      } as CreateUserDto);

      if (user) {
        done(null, user);
      } else {
        done(new Error('User not found or created'), null);
      }
    } catch (err) {
      done(err, null);
    }
  }
}
