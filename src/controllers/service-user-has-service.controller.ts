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
  Service,
  UserHasService
} from '../models';
import {ServiceRepository} from '../repositories';

@authenticate('jwt')
export class ServiceUserHasServiceController {
  constructor(
    @repository(ServiceRepository) protected serviceRepository: ServiceRepository,
  ) { }

  @get('/services/{id}/user-has-services', {
    responses: {
      '200': {
        description: 'Array of Service has many UserHasService',
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
    return this.serviceRepository.userHasServices(id).find(filter);
  }

  @post('/services/{id}/user-has-services', {
    responses: {
      '200': {
        description: 'Service model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserHasService)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Service.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasService, {
            title: 'NewUserHasServiceInService',
            exclude: ['id'],
            optional: ['serviceId']
          }),
        },
      },
    }) userHasService: Omit<UserHasService, 'id'>,
  ): Promise<UserHasService> {
    return this.serviceRepository.userHasServices(id).create(userHasService);
  }

  @patch('/services/{id}/user-has-services', {
    responses: {
      '200': {
        description: 'Service.UserHasService PATCH success count',
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
    return this.serviceRepository.userHasServices(id).patch(userHasService, where);
  }

  @del('/services/{id}/user-has-services', {
    responses: {
      '200': {
        description: 'Service.UserHasService DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserHasService)) where?: Where<UserHasService>,
  ): Promise<Count> {
    return this.serviceRepository.userHasServices(id).delete(where);
  }
}
