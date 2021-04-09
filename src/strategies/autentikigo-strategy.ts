import {AuthenticationStrategy} from '@loopback/authentication';
import {model} from '@loopback/repository';
import {Request} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';

const jwt = require('jsonwebtoken');
const autentikigo = require('../../../autentikigo-package/index');

@model()
export class User implements UserProfile {

  [securityId]: string;

  id: number;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}

export class AutentikigoStrategy implements AuthenticationStrategy {
  name = 'autentikigo';

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = request.headers.authorization?.split(' ')[1];

    // Get user id
    const decoded = await jwt.verify(token, process.env.AUTENTIKIGO_JWT_SECRET);

    const middleware = await autentikigo.middleware(
      {
        token: token,
        refreshToken: token,
        userId: decoded.id,
        clientId: process.env.AUTENTIKIGO_CLIENT_ID,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
        jwtRefreshSecret: process.env.AUTENTIKIGO_JWT_REFRESH_SECRET
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING
      }
    )

    let userProfile = undefined;
    if (middleware.code === 200) {
      userProfile = this.convertIdToUserProfile(decoded.id);
    }

    return userProfile;
  }

  convertIdToUserProfile(id: string): UserProfile {
    return {
      id: id,
      [securityId]: id.toString(),
    };
  }
}
