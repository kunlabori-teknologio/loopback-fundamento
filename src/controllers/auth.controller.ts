// Uncomment these imports to begin using these cool features!

import {inject, service} from '@loopback/core';
import {Entity, model, property} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
  Response,
  RestBindings
} from '@loopback/rest';
import _ from 'lodash';
import {AuthService} from '../services/auth.service';

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

  @property({
    type: 'string',
    required: true,
  })
  projectId: string;
}

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
    description: 'DD/MM/AAAA',
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
}

@model()
export class AuthorizeSchema extends Entity {

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  verified: boolean;

  @property({
    type: 'string',
    required: true,
  })
  acl: string;

  @property({
    type: 'string',
    required: true,
  })
  projectId: string;
}

@model()
export class PasswordRecoveryTokenSchema extends Entity {

  @property({
    type: 'string',
    required: true,
  })
  email: string;
}

@model()
export class RecoverPasswordSchema extends Entity {

  @property({
    type: 'string',
    required: true,
  })
  newPassword: string;
}

export class AuthController {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @service(AuthService) public authService: AuthService,
  ) { }

  @post('auth/login')
  @response(200, {
    description: 'Token and refresh token',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          example: {
            'token': 'string',
            'refreshToken': 'string',
          }
        },
      },
    },
  })
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
    const {data, code, message} = await autentikigo.login(
      {
        user: loginRequest.user,
        password: loginRequest.password,
        projectId: loginRequest.projectId,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
        jwtRefreshSecret: process.env.AUTENTIKIGO_JWT_REFRESH_SECRET,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING,
      },
    );

    return this.response.status(code).send(
      _.isEmpty(data)
        ? {
          error: {
            statusCode: code,
            message: message,
          },
        }
        : data,
    );
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
        cnpjApiEndpoint: process.env.AUTENTIKIGO_CNPJ_API_ENDPOINT,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING,
      },
    );

    this.response.status(signup.code).send(
      _.isEmpty(signup.data)
        ? {
          error: {
            statusCode: signup.code,
            message: signup.message,
          },
        }
        : signup.data,
    );

    return this.response;
  }

  @post('auth/authorize')
  async authorizeUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AuthorizeSchema),
        },
      },
    })
    authorizeRequest: AuthorizeSchema,
  ): Promise<Response> {
    const authorize = await autentikigo.authorizeProject(
      {
        userId: authorizeRequest.userId,
        verified: authorizeRequest.verified,
        acl: authorizeRequest.acl,
        projectId: authorizeRequest.projectId,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING,
      },
    );

    this.response.status(authorize.code).send(
      _.isEmpty(authorize.data)
        ? {
          error: {
            statusCode: authorize.code,
            message: authorize.message,
          },
        }
        : authorize.data,
    );

    return this.response;
  }

  @get('auth/get-user/{token}')
  @response(200, {
    description: 'Full user information',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          example: {
            "type": "string",
            "_id": "string",
            "email": "string",
            "personInfo": {
              "country": "string",
              "_id": "string",
              "name": "string",
              "uniqueId": "string",
              "birthday": "string",
              "gender": "string",
              "mother": "string",
              "username": "string"
            },
            "acl": {
              "_id": "string",
              "projectId": "string",
              "name": "string",
              "permissions": [
                {
                  "actions": [
                    {
                      "_id": "string",
                      "name": "string"
                    },
                  ],
                  "moduleId": {
                    "_id": "string",
                    "name": "string",
                    "menu": {
                      "_id": "string",
                      "name": "string",
                      "route": "string"
                    }
                  }
                },
              ]
            },
            "verified": "boolean"
          }
        },
      },
    },
  })
  async getUserInfo(
    @param.path.string('token') token: string,
  ): Promise<Response> {
    const {data, code} = await autentikigo.getUserInfo(
      {
        token: token,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING,
      },
    );

    return this.response.status(code).send(data);
  }

  @get('auth/refresh-token/{refreshToken}')
  @response(200, {
    description: 'New token and refresh token',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          example: {
            'token': 'string',
            'refreshToken': 'string',
          }
        },
      },
    },
  })
  async refreshToken(
    @param.path.string('refreshToken') refreshToken: string,
  ): Promise<Response> {

    const newToken = await autentikigo.refreshToken(
      {
        refreshToken: refreshToken,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
        jwtRefreshSecret: process.env.AUTENTIKIGO_JWT_REFRESH_SECRET,
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

  @post('auth/password-recovery-token')
  async generatePasswordRecoveryToken(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PasswordRecoveryTokenSchema),
        },
      },
    })
    passwordRecoveryTokenRequest: PasswordRecoveryTokenSchema,
  ): Promise<Response> {
    const passwordRecoveryToken = await autentikigo.generateRecoveryPasswordToken(
      {
        email: passwordRecoveryTokenRequest.email,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING,
      },
    );

    this.response.status(passwordRecoveryToken.code).send(
      _.isEmpty(passwordRecoveryToken.data)
        ? {
          error: {
            statusCode: passwordRecoveryToken.code,
            message: passwordRecoveryToken.message,
          },
        }
        : passwordRecoveryToken.data,
    );

    return this.response;
  }

  @post('auth/recover-password/{token}')
  async recoverPassword(
    @param.path.string('token') token: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecoverPasswordSchema),
        },
      },
    })
    recoverPasswordRequest: RecoverPasswordSchema,
  ): Promise<Response> {
    const recoverPassword = await autentikigo.changePassword(
      {
        password: recoverPasswordRequest.newPassword,
        recoveryPasswordToken: token,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
      },
      {
        connectionString: process.env.AUTENTIKIGO_CONNECTION_STRING,
      },
    );

    this.response.status(recoverPassword.code).send(
      recoverPassword.code !== 200
        ? {
          error: {
            statusCode: recoverPassword.code,
            message: recoverPassword.message,
          },
        }
        : recoverPassword.message,
    );

    return this.response;
  }
}
