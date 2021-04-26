// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {Entity, model, property} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody, Response, RestBindings} from '@loopback/rest';
import _ from 'lodash';

// Autentikigo package
const autentikigo = require('autentikigo');

@model()
export class LoginSchema extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  user: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;
};

@model()
export class SignupSchema extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  uniqueId: string;

  @property({
    type: 'string',
    required: true,
    description: 'DD/MM/AAAA'
  })
  birthday: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;
};

export class AuthController {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) { }

  @post('auth/login')
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LoginSchema),
        },
      },
    })
    loginRequest: LoginSchema,
  ): Promise<Response> {

    const login = await autentikigo.login(
      {
        user: loginRequest.user,
        password: loginRequest.password,
        clientId: process.env.AUTENTIKIGO_CLIENT_ID,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
        jwtRefreshSecret: process.env.AUTENTIKIGO_JWT_REFRESH_SECRET
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING
      }
    );

    this.response.status(login.code).send(
      _.isEmpty(login.data) ?
        {
          "error": {
            "statusCode": login.code,
            "message": login.message
          }
        }
        :
        login.data
    );

    return this.response;
  }

  @post('auth/register')
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SignupSchema),
        },
      },
    })
    signupRequest: SignupSchema,
  ): Promise<Response> {

    const signup = await autentikigo.register(
      {
        uniqueId: signupRequest.uniqueId,
        birthday: signupRequest.birthday,
        email: signupRequest.email,
        password: signupRequest.password,
        cpfApiEndpoint: process.env.AUTENTIKIGO_CPF_API_ENDPOINT,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING
      }
    );

    this.response.status(signup.code).send(
      _.isEmpty(signup.data) ?
        {
          "error": {
            "statusCode": signup.code,
            "message": signup.message
          }
        }
        :
        signup.data
    );

    return this.response;
  }

  @post('auth/authorize/{userId}')
  async authorizeUser(
    @param.path.string('userId') userId: string,
  ): Promise<Response> {

    const authorize = await autentikigo.authorizeCompany(
      {
        userId: userId,
        verified: true,
        clientId: process.env.AUTENTIKIGO_CLIENT_ID,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING
      }
    );

    this.response.status(authorize.code).send(
      _.isEmpty(authorize.data) ?
        {
          "error": {
            "statusCode": authorize.code,
            "message": authorize.message
          }
        }
        :
        authorize.data
    );

    return this.response;
  }

  @post('auth/admin-authorize/{userId}')
  async authorizeAdminUser(
    @param.path.string('userId') userId: string,
  ): Promise<Response> {

    const authorize = await autentikigo.authorizeCompany(
      {
        userId: userId,
        verified: true,
        role: 'admin',
        clientId: process.env.AUTENTIKIGO_CLIENT_ID,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING
      }
    );

    this.response.status(authorize.code).send(
      _.isEmpty(authorize.data) ?
        {
          "error": {
            "statusCode": authorize.code,
            "message": authorize.message
          }
        }
        :
        authorize.data
    );

    return this.response;
  }

  @get('auth/getUser/{token}')
  async getUserInfo(
    @param.path.string('token') token: string,
  ): Promise<Response> {

    const user = await autentikigo.getUserInfo(
      {
        token: token,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
        clientId: process.env.AUTENTIKIGO_CLIENT_ID,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING
      }
    );

    this.response.status(user.code).send(
      _.isEmpty(user.data) ?
        {
          "error": {
            "statusCode": user.code,
            "message": user.message
          }
        }
        :
        user.data
    );

    return this.response;
  }

  @get('auth/refreshToken/{refreshToken}')
  async refreshToken(
    @param.path.string('refreshToken') refreshToken: string,
  ): Promise<Response> {

    const newToken = await autentikigo.refreshToken(
      {
        refreshToken: refreshToken,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
        jwtRefreshSecret: process.env.AUTENTIKIGO_JWT_REFRESH_SECRET,
        clientId: process.env.AUTENTIKIGO_CLIENT_ID,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING
      }
    );

    this.response.status(newToken.code).send(
      _.isEmpty(newToken.data) ?
        {
          "error": {
            "statusCode": newToken.code,
            "message": newToken.message
          }
        }
        :
        newToken.data
    );

    return this.response;
  }
}
