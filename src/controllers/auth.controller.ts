// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {Entity, model, property} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, Response, RestBindings} from '@loopback/rest';
import _ from 'lodash';

// Autentikigo package
const autentikigo = require('../../../autentikigo-package/index');

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
  idNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  birthDate: string;

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

  @post('/login')
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

  @post('/register')
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
        idNumber: signupRequest.idNumber,
        birthDate: signupRequest.birthDate,
        email: signupRequest.email,
        password: signupRequest.password,
        clientId: process.env.AUTENTIKIGO_CLIENT_ID,
        jwtSecret: process.env.AUTENTIKIGO_JWT_SECRET,
        jwtRefreshSecret: process.env.AUTENTIKIGO_JWT_REFRESH_SECRET,
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
}
