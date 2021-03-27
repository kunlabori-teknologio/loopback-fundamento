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
import {CompanyHasPersonHasRole} from '../models';
import {CompanyHasPersonHasRoleRepository} from '../repositories';

@authenticate('jwt')
export class CompanyHasPersonHasRoleController {
  constructor(
    @repository(CompanyHasPersonHasRoleRepository)
    public companyHasPersonHasRoleRepository : CompanyHasPersonHasRoleRepository,
  ) {}

  @post('/company-has-person-has-roles')
  @response(200, {
    description: 'CompanyHasPersonHasRole model instance',
    content: {'application/json': {schema: getModelSchemaRef(CompanyHasPersonHasRole)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPersonHasRole, {
            title: 'NewCompanyHasPersonHasRole',
            exclude: ['id'],
          }),
        },
      },
    })
    companyHasPersonHasRole: Omit<CompanyHasPersonHasRole, 'id'>,
  ): Promise<CompanyHasPersonHasRole> {
    return this.companyHasPersonHasRoleRepository.create(companyHasPersonHasRole);
  }

  @get('/company-has-person-has-roles/count')
  @response(200, {
    description: 'CompanyHasPersonHasRole model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CompanyHasPersonHasRole) where?: Where<CompanyHasPersonHasRole>,
  ): Promise<Count> {
    return this.companyHasPersonHasRoleRepository.count(where);
  }

  @get('/company-has-person-has-roles')
  @response(200, {
    description: 'Array of CompanyHasPersonHasRole model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CompanyHasPersonHasRole, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CompanyHasPersonHasRole) filter?: Filter<CompanyHasPersonHasRole>,
  ): Promise<CompanyHasPersonHasRole[]> {
    return this.companyHasPersonHasRoleRepository.find(filter);
  }

  @patch('/company-has-person-has-roles')
  @response(200, {
    description: 'CompanyHasPersonHasRole PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPersonHasRole, {partial: true}),
        },
      },
    })
    companyHasPersonHasRole: CompanyHasPersonHasRole,
    @param.where(CompanyHasPersonHasRole) where?: Where<CompanyHasPersonHasRole>,
  ): Promise<Count> {
    return this.companyHasPersonHasRoleRepository.updateAll(companyHasPersonHasRole, where);
  }

  @get('/company-has-person-has-roles/{id}')
  @response(200, {
    description: 'CompanyHasPersonHasRole model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompanyHasPersonHasRole, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CompanyHasPersonHasRole, {exclude: 'where'}) filter?: FilterExcludingWhere<CompanyHasPersonHasRole>
  ): Promise<CompanyHasPersonHasRole> {
    return this.companyHasPersonHasRoleRepository.findById(id, filter);
  }

  @patch('/company-has-person-has-roles/{id}')
  @response(204, {
    description: 'CompanyHasPersonHasRole PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPersonHasRole, {partial: true}),
        },
      },
    })
    companyHasPersonHasRole: CompanyHasPersonHasRole,
  ): Promise<void> {
    await this.companyHasPersonHasRoleRepository.updateById(id, companyHasPersonHasRole);
  }

  @put('/company-has-person-has-roles/{id}')
  @response(204, {
    description: 'CompanyHasPersonHasRole PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() companyHasPersonHasRole: CompanyHasPersonHasRole,
  ): Promise<void> {
    await this.companyHasPersonHasRoleRepository.replaceById(id, companyHasPersonHasRole);
  }

  @del('/company-has-person-has-roles/{id}')
  @response(204, {
    description: 'CompanyHasPersonHasRole DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyHasPersonHasRoleRepository.deleteById(id);
  }
}
