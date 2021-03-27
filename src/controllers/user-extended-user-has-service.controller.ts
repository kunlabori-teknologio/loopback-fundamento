import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  UserExtended,
  UserHasService
} from '../models';
import {UserExtendedRepository} from '../repositories';

@authenticate('jwt')
export class UserExtendedUserHasServiceController {
  constructor(
    @repository(UserExtendedRepository) protected userExtendedRepository: UserExtendedRepository,
  ) { }

  @get('/user-extendeds/{id}/user-has-services', {
    responses: {
      '200': {
        description: 'Array of UserExtended has many UserHasService',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserHasService)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserHasService>,
  ): Promise<UserHasService[]> {
    return this.userExtendedRepository.userHasServices(id).find(filter);
  }

  @post('/user-extendeds/{id}/user-has-services', {
    responses: {
      '200': {
        description: 'UserExtended model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserHasService)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserExtended.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasService, {
            title: 'NewUserHasServiceInUserExtended',
            exclude: ['id'],
            optional: ['userExtendedId']
          }),
        },
      },
    }) userHasService: Omit<UserHasService, 'id'>,
  ): Promise<UserHasService> {
    return this.userExtendedRepository.userHasServices(id).create(userHasService);
  }

  @patch('/user-extendeds/{id}/user-has-services', {
    responses: {
      '200': {
        description: 'UserExtended.UserHasService PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasService, {partial: true}),
        },
      },
    })
    userHasService: Partial<UserHasService>,
    @param.query.object('where', getWhereSchemaFor(UserHasService)) where?: Where<UserHasService>,
  ): Promise<Count> {
    return this.userExtendedRepository.userHasServices(id).patch(userHasService, where);
  }

  @del('/user-extendeds/{id}/user-has-services', {
    responses: {
      '200': {
        description: 'UserExtended.UserHasService DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserHasService)) where?: Where<UserHasService>,
  ): Promise<Count> {
    return this.userExtendedRepository.userHasServices(id).delete(where);
  }
}
