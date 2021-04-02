import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Person,
  CompanyHasPerson,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonCompanyHasPersonController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/company-has-people', {
    responses: {
      '200': {
        description: 'Array of Person has many CompanyHasPerson',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CompanyHasPerson)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CompanyHasPerson>,
  ): Promise<CompanyHasPerson[]> {
    return this.personRepository.companyHasPeople(id).find(filter);
  }

  @post('/people/{id}/company-has-people', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyHasPerson)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPerson, {
            title: 'NewCompanyHasPersonInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) companyHasPerson: Omit<CompanyHasPerson, 'id'>,
  ): Promise<CompanyHasPerson> {
    return this.personRepository.companyHasPeople(id).create(companyHasPerson);
  }

  @patch('/people/{id}/company-has-people', {
    responses: {
      '200': {
        description: 'Person.CompanyHasPerson PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPerson, {partial: true}),
        },
      },
    })
    companyHasPerson: Partial<CompanyHasPerson>,
    @param.query.object('where', getWhereSchemaFor(CompanyHasPerson)) where?: Where<CompanyHasPerson>,
  ): Promise<Count> {
    return this.personRepository.companyHasPeople(id).patch(companyHasPerson, where);
  }

  @del('/people/{id}/company-has-people', {
    responses: {
      '200': {
        description: 'Person.CompanyHasPerson DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CompanyHasPerson)) where?: Where<CompanyHasPerson>,
  ): Promise<Count> {
    return this.personRepository.companyHasPeople(id).delete(where);
  }
}
