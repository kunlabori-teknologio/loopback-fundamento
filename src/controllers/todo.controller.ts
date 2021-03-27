// import {inject} from '@loopback/core';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
export class TodoController {
  constructor() {}
}
