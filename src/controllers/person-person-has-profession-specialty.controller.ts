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
  Person,
  PersonHasProfessionSpecialty
} from '../models';
import {PersonRepository} from '../repositories';

@authenticate('jwt')
export class PersonPersonHasProfessionSpecialtyController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/person-has-profession-specialties', {
    responses: {
      '200': {
        description: 'Array of Person has many PersonHasProfessionSpecialty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PersonHasProfessionSpecialty)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PersonHasProfessionSpecialty>,
  ): Promise<PersonHasProfessionSpecialty[]> {
    return this.personRepository.personHasProfessionSpecialties(id).find(filter);
  }

  @post('/people/{id}/person-has-profession-specialties', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(PersonHasProfessionSpecialty)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonHasProfessionSpecialty, {
            title: 'NewPersonHasProfessionSpecialtyInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) personHasProfessionSpecialty: Omit<PersonHasProfessionSpecialty, 'id'>,
  ): Promise<PersonHasProfessionSpecialty> {
    return this.personRepository.personHasProfessionSpecialties(id).create(personHasProfessionSpecialty);
  }

  @patch('/people/{id}/person-has-profession-specialties', {
    responses: {
      '200': {
        description: 'Person.PersonHasProfessionSpecialty PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonHasProfessionSpecialty, {partial: true}),
        },
      },
    })
    personHasProfessionSpecialty: Partial<PersonHasProfessionSpecialty>,
    @param.query.object('where', getWhereSchemaFor(PersonHasProfessionSpecialty)) where?: Where<PersonHasProfessionSpecialty>,
  ): Promise<Count> {
    return this.personRepository.personHasProfessionSpecialties(id).patch(personHasProfessionSpecialty, where);
  }

  @del('/people/{id}/person-has-profession-specialties', {
    responses: {
      '200': {
        description: 'Person.PersonHasProfessionSpecialty DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PersonHasProfessionSpecialty)) where?: Where<PersonHasProfessionSpecialty>,
  ): Promise<Count> {
    return this.personRepository.personHasProfessionSpecialties(id).delete(where);
  }
}
