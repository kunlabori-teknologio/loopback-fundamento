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
  Company,
  CompanyHasPersonHasRole
} from '../models';
import {CompanyRepository} from '../repositories';

@authenticate('jwt')
export class CompanyCompanyHasPersonHasRoleController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Array of Company has many CompanyHasPersonHasRole',
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
    return this.companyRepository.companyHasPersonHasRoles(id).find(filter);
  }

  @post('/companies/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyHasPersonHasRole)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPersonHasRole, {
            title: 'NewCompanyHasPersonHasRoleInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) companyHasPersonHasRole: Omit<CompanyHasPersonHasRole, 'id'>,
  ): Promise<CompanyHasPersonHasRole> {
    return this.companyRepository.companyHasPersonHasRoles(id).create(companyHasPersonHasRole);
  }

  @patch('/companies/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Company.CompanyHasPersonHasRole PATCH success count',
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
    return this.companyRepository.companyHasPersonHasRoles(id).patch(companyHasPersonHasRole, where);
  }

  @del('/companies/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Company.CompanyHasPersonHasRole DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CompanyHasPersonHasRole)) where?: Where<CompanyHasPersonHasRole>,
  ): Promise<Count> {
    return this.companyRepository.companyHasPersonHasRoles(id).delete(where);
  }
}
