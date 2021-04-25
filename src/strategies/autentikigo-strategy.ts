import {AuthenticationStrategy} from '@loopback/authentication';
import {model} from '@loopback/repository';
import {Request} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {verify} from 'jsonwebtoken';
import * as acl from './acl';

const autentikigo = require('autentikigo');

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

    try {

      const token = request.headers.authorization?.split(' ')[1];
      const secret = process.env.AUTENTIKIGO_JWT_SECRET;

      // Get user id
      const decoded = await verify(<string>token, <string>secret);

      const middleware = await autentikigo.middleware(
        {
          token: token,
          jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
          userId: (<any>decoded).id,
          clientId: process.env.AUTENTIKIGO_CLIENT_ID,
          roles: acl.roles,
          endpoint: request.path,
          method: request.method,
        },
        {
          connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING
        }
      )

      if (middleware.code === 200) {
        const userProfile = this.convertIdToUserProfile((<any>decoded).id);
        return userProfile;
      }

      return undefined;

    } catch (e) {
      return undefined;
    }
  }

  convertIdToUserProfile(id: string): UserProfile {
    return {
      id: id,
      [securityId]: id.toString(),
    };
  }
}
