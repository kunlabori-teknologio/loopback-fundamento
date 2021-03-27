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
  CompanyHasPerson,
  Person
} from '../models';
import {CompanyHasPersonRepository} from '../repositories';

@authenticate('jwt')
export class CompanyHasPersonPersonController {
  constructor(
    @repository(CompanyHasPersonRepository) protected companyHasPersonRepository: CompanyHasPersonRepository,
  ) { }

  @get('/company-has-people/{id}/people', {
    responses: {
      '200': {
        description: 'Array of CompanyHasPerson has many Person',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Person>,
  ): Promise<Person[]> {
    return this.companyHasPersonRepository.people(id).find(filter);
  }

  @post('/company-has-people/{id}/people', {
    responses: {
      '200': {
        description: 'CompanyHasPerson model instance',
        content: {'application/json': {schema: getModelSchemaRef(Person)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CompanyHasPerson.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPersonInCompanyHasPerson',
            exclude: ['id'],
            optional: ['companyHasPersonId']
          }),
        },
      },
    }) person: Omit<Person, 'id'>,
  ): Promise<Person> {
    return this.companyHasPersonRepository.people(id).create(person);
  }

  @patch('/company-has-people/{id}/people', {
    responses: {
      '200': {
        description: 'CompanyHasPerson.Person PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Partial<Person>,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.companyHasPersonRepository.people(id).patch(person, where);
  }

  @del('/company-has-people/{id}/people', {
    responses: {
      '200': {
        description: 'CompanyHasPerson.Person DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.companyHasPersonRepository.people(id).delete(where);
  }
}
