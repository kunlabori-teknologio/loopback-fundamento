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
import {Module} from '../models';
import {ComponentRepository, ModuleRepository} from '../repositories';
import {AuthService} from '../services';

@authenticate('jwt')
export class ModuleController {
  constructor(
    @repository(ModuleRepository)
    public moduleRepository: ModuleRepository,

    @repository(ComponentRepository)
    public componentRepository: ComponentRepository,

    @service(AuthService) public authService: AuthService,
  ) { }

  @post('/modules')
  @response(200, {
    description: 'Module model instance',
    content: {'application/json': {schema: getModelSchemaRef(Module)}},
  })
  async create(
    @param.header.string('Authorization') authorization: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Module, {
            title: 'NewModule',
            exclude: ['id'],
          }),
        },
      },
    })
    module: Omit<Module, 'id'>,
  ): Promise<Module> {
    var userId: string = await this.authService.getUserId(authorization);
    return this.moduleRepository.create({
      ...module,
      _createdBy: userId,
      _ownedBy: userId,
    });
  }

  @get('/modules/count')
  @response(200, {
    description: 'Module model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Module) where?: Where<Module>,
  ): Promise<Count> {
    return this.moduleRepository.count(where);
  }

  @get('/modules')
  @response(200, {
    description: 'Array of Module model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Module, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Module) filter?: Filter<Module>,
  ): Promise<Module[]> {

    // Get all components to populate modules
    var components = await this.componentRepository.find();

    // Get modules and populate components field with data from component repository
    var modules = await this.moduleRepository.find(filter);
    modules = modules.map(module => {
      module.components = components.filter(component => module.components?.map(el => el.toString()).includes(component.id?.toString()));
      return module;
    });

    return modules;
  }

  @patch('/modules')
  @response(200, {
    description: 'Module PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Module, {partial: true}),
        },
      },
    })
    module: Module,
    @param.where(Module) where?: Where<Module>,
  ): Promise<Count> {
    return this.moduleRepository.updateAll(module, where);
  }

  @get('/modules/{id}')
  @response(200, {
    description: 'Module model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Module, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Module, {exclude: 'where'}) filter?: FilterExcludingWhere<Module>
  ): Promise<Module> {
    return this.moduleRepository.findById(id, filter);
  }

  @patch('/modules/{id}')
  @response(204, {
    description: 'Module PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Module, {partial: true}),
        },
      },
    })
    module: Module,
  ): Promise<void> {
    await this.moduleRepository.updateById(id, module);
  }

  @put('/modules/{id}')
  @response(204, {
    description: 'Module PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() module: Module,
  ): Promise<void> {
    await this.moduleRepository.replaceById(id, module);
  }

  @del('/modules/{id}')
  @response(204, {
    description: 'Module DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.moduleRepository.deleteById(id);
  }
}
