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
  CompanyHasPersonHasRole, Person
} from '../models';
import {PersonRepository} from '../repositories';

@authenticate('jwt')
export class PersonCompanyHasPersonHasRoleController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Array of Person has many CompanyHasPersonHasRole',
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
    return this.personRepository.companyHasPersonHasRoles(id).find(filter);
  }

  @post('/people/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyHasPersonHasRole)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPersonHasRole, {
            title: 'NewCompanyHasPersonHasRoleInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) companyHasPersonHasRole: Omit<CompanyHasPersonHasRole, 'id'>,
  ): Promise<CompanyHasPersonHasRole> {
    return this.personRepository.companyHasPersonHasRoles(id).create(companyHasPersonHasRole);
  }

  @patch('/people/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Person.CompanyHasPersonHasRole PATCH success count',
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
    return this.personRepository.companyHasPersonHasRoles(id).patch(companyHasPersonHasRole, where);
  }

  @del('/people/{id}/company-has-person-has-roles', {
    responses: {
      '200': {
        description: 'Person.CompanyHasPersonHasRole DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CompanyHasPersonHasRole)) where?: Where<CompanyHasPersonHasRole>,
  ): Promise<Count> {
    return this.personRepository.companyHasPersonHasRoles(id).delete(where);
  }
}
