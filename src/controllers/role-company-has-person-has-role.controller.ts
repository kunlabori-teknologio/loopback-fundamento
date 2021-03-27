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
  CompanyHasPersonHasRole, Role
} from '../models';
import {RoleRepository} from '../repositories';

@authenticate('jwt')
export class RoleCompanyHasPersonHasRoleController {
  constructor(
    @repository(RoleRepository) protected roleRepository: RoleRepository,
  ) { }

  @get('/roles/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Array of Role has many CompanyHasPersonHasRole',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CompanyHasPersonHasRole)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CompanyHasPersonHasRole>,
  ): Promise<CompanyHasPersonHasRole[]> {
    return this.roleRepository.companyHasPersonHasRoles(id).find(filter);
  }

  @post('/roles/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyHasPersonHasRole)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Role.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPersonHasRole, {
            title: 'NewCompanyHasPersonHasRoleInRole',
            exclude: ['id'],
            optional: ['roleId']
          }),
        },
      },
    }) companyHasPersonHasRole: Omit<CompanyHasPersonHasRole, 'id'>,
  ): Promise<CompanyHasPersonHasRole> {
    return this.roleRepository.companyHasPersonHasRoles(id).create(companyHasPersonHasRole);
  }

  @patch('/roles/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Role.CompanyHasPersonHasRole PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPersonHasRole, {partial: true}),
        },
      },
    })
    companyHasPersonHasRole: Partial<CompanyHasPersonHasRole>,
    @param.query.object('where', getWhereSchemaFor(CompanyHasPersonHasRole)) where?: Where<CompanyHasPersonHasRole>,
  ): Promise<Count> {
    return this.roleRepository.companyHasPersonHasRoles(id).patch(companyHasPersonHasRole, where);
  }

  @del('/roles/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Role.CompanyHasPersonHasRole DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CompanyHasPersonHasRole)) where?: Where<CompanyHasPersonHasRole>,
  ): Promise<Count> {
    return this.roleRepository.companyHasPersonHasRoles(id).delete(where);
  }
}
