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
  PersonHasProfessionSpecialty, ProfessionSpecialty
} from '../models';
import {ProfessionSpecialtyRepository} from '../repositories';

@authenticate('jwt')
export class ProfessionSpecialtyPersonHasProfessionSpecialtyController {
  constructor(
    @repository(ProfessionSpecialtyRepository) protected professionSpecialtyRepository: ProfessionSpecialtyRepository,
  ) { }

  @get('/profession-specialties/{id}/person-has-profession-specialties', {
    responses: {
      '200': {
        description: 'Array of ProfessionSpecialty has many PersonHasProfessionSpecialty',
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
    return this.professionSpecialtyRepository.personHasProfessionSpecialties(id).find(filter);
  }

  @post('/profession-specialties/{id}/person-has-profession-specialties', {
    responses: {
      '200': {
        description: 'ProfessionSpecialty model instance',
        content: {'application/json': {schema: getModelSchemaRef(PersonHasProfessionSpecialty)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProfessionSpecialty.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonHasProfessionSpecialty, {
            title: 'NewPersonHasProfessionSpecialtyInProfessionSpecialty',
            exclude: ['id'],
            optional: ['professionSpecialtyId']
          }),
        },
      },
    }) personHasProfessionSpecialty: Omit<PersonHasProfessionSpecialty, 'id'>,
  ): Promise<PersonHasProfessionSpecialty> {
    return this.professionSpecialtyRepository.personHasProfessionSpecialties(id).create(personHasProfessionSpecialty);
  }

  @patch('/profession-specialties/{id}/person-has-profession-specialties', {
    responses: {
      '200': {
        description: 'ProfessionSpecialty.PersonHasProfessionSpecialty PATCH success count',
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
    return this.professionSpecialtyRepository.personHasProfessionSpecialties(id).patch(personHasProfessionSpecialty, where);
  }

  @del('/profession-specialties/{id}/person-has-profession-specialties', {
    responses: {
      '200': {
        description: 'ProfessionSpecialty.PersonHasProfessionSpecialty DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PersonHasProfessionSpecialty)) where?: Where<PersonHasProfessionSpecialty>,
  ): Promise<Count> {
    return this.professionSpecialtyRepository.personHasProfessionSpecialties(id).delete(where);
  }
}
