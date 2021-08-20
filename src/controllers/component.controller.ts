import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
import {Component} from '../models';
import {ComponentRepository} from '../repositories';
import {AuthService} from '../services';

@authenticate('jwt')
export class ComponentController {
  constructor(
    @repository(ComponentRepository)
    public componentRepository: ComponentRepository,

    @service(AuthService) public authService: AuthService,
  ) { }

  @post('/components')
  @response(200, {
    description: 'Component model instance',
    content: {'application/json': {schema: getModelSchemaRef(Component)}},
  })
  async create(
    @param.header.string('Authorization') authorization: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Component, {
            title: 'NewComponent',
            exclude: ['id'],
          }),
        },
      },
    })
    component: Omit<Component, 'id'>,
  ): Promise<Component> {
    var userId: string = await this.authService.getUserId(authorization);
    return this.componentRepository.create({
      ...component,
      _createdBy: userId,
      _ownedBy: userId,
    });
  }

  @get('/components/count')
  @response(200, {
    description: 'Component model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Component) where?: Where<Component>,
  ): Promise<Count> {
    return this.componentRepository.count(where);
  }

  @get('/components')
  @response(200, {
    description: 'Array of Component model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Component, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Component) filter?: Filter<Component>,
  ): Promise<Component[]> {
    return this.componentRepository.find(filter);
  }

  @patch('/components')
  @response(200, {
    description: 'Component PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Component, {partial: true}),
        },
      },
    })
    component: Component,
    @param.where(Component) where?: Where<Component>,
  ): Promise<Count> {
    return this.componentRepository.updateAll(component, where);
  }

  @get('/components/{id}')
  @response(200, {
    description: 'Component model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Component, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Component, {exclude: 'where'}) filter?: FilterExcludingWhere<Component>
  ): Promise<Component> {
    return this.componentRepository.findById(id, filter);
  }

  @patch('/components/{id}')
  @response(204, {
    description: 'Component PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Component, {partial: true}),
        },
      },
    })
    component: Component,
  ): Promise<void> {
    await this.componentRepository.updateById(id, component);
  }

  @put('/components/{id}')
  @response(204, {
    description: 'Component PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() component: Component,
  ): Promise<void> {
    await this.componentRepository.replaceById(id, component);
  }

  @del('/components/{id}')
  @response(204, {
    description: 'Component DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.componentRepository.deleteById(id);
  }
}
