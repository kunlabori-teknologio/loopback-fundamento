import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {UserHasService} from '../models';
import {UserHasServiceRepository} from '../repositories';

@authenticate('jwt')
export class UserHasServiceController {
  constructor(
    @repository(UserHasServiceRepository)
    public userHasServiceRepository : UserHasServiceRepository,
  ) {}

  @post('/user-has-services')
  @response(200, {
    description: 'UserHasService model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserHasService)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasService, {
            title: 'NewUserHasService',
            exclude: ['id'],
          }),
        },
      },
    })
    userHasService: Omit<UserHasService, 'id'>,
  ): Promise<UserHasService> {
    return this.userHasServiceRepository.create(userHasService);
  }

  @get('/user-has-services/count')
  @response(200, {
    description: 'UserHasService model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserHasService) where?: Where<UserHasService>,
  ): Promise<Count> {
    return this.userHasServiceRepository.count(where);
  }

  @get('/user-has-services')
  @response(200, {
    description: 'Array of UserHasService model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserHasService, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserHasService) filter?: Filter<UserHasService>,
  ): Promise<UserHasService[]> {
    return this.userHasServiceRepository.find(filter);
  }

  @patch('/user-has-services')
  @response(200, {
    description: 'UserHasService PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasService, {partial: true}),
        },
      },
    })
    userHasService: UserHasService,
    @param.where(UserHasService) where?: Where<UserHasService>,
  ): Promise<Count> {
    return this.userHasServiceRepository.updateAll(userHasService, where);
  }

  @get('/user-has-services/{id}')
  @response(200, {
    description: 'UserHasService model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserHasService, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserHasService, {exclude: 'where'}) filter?: FilterExcludingWhere<UserHasService>
  ): Promise<UserHasService> {
    return this.userHasServiceRepository.findById(id, filter);
  }

  @patch('/user-has-services/{id}')
  @response(204, {
    description: 'UserHasService PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasService, {partial: true}),
        },
      },
    })
    userHasService: UserHasService,
  ): Promise<void> {
    await this.userHasServiceRepository.updateById(id, userHasService);
  }

  @put('/user-has-services/{id}')
  @response(204, {
    description: 'UserHasService PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userHasService: UserHasService,
  ): Promise<void> {
    await this.userHasServiceRepository.replaceById(id, userHasService);
  }

  @del('/user-has-services/{id}')
  @response(204, {
    description: 'UserHasService DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userHasServiceRepository.deleteById(id);
  }
}
