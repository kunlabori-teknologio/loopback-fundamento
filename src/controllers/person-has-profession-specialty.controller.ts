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
import {PersonHasProfessionSpecialty} from '../models';
import {PersonHasProfessionSpecialtyRepository} from '../repositories';

@authenticate('jwt')
export class PersonHasProfessionSpecialtyController {
  constructor(
    @repository(PersonHasProfessionSpecialtyRepository)
    public personHasProfessionSpecialtyRepository : PersonHasProfessionSpecialtyRepository,
  ) {}

  @post('/person-has-profession-specialties')
  @response(200, {
    description: 'PersonHasProfessionSpecialty model instance',
    content: {'application/json': {schema: getModelSchemaRef(PersonHasProfessionSpecialty)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonHasProfessionSpecialty, {
            title: 'NewPersonHasProfessionSpecialty',
            exclude: ['id'],
          }),
        },
      },
    })
    personHasProfessionSpecialty: Omit<PersonHasProfessionSpecialty, 'id'>,
  ): Promise<PersonHasProfessionSpecialty> {
    return this.personHasProfessionSpecialtyRepository.create(personHasProfessionSpecialty);
  }

  @get('/person-has-profession-specialties/count')
  @response(200, {
    description: 'PersonHasProfessionSpecialty model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PersonHasProfessionSpecialty) where?: Where<PersonHasProfessionSpecialty>,
  ): Promise<Count> {
    return this.personHasProfessionSpecialtyRepository.count(where);
  }

  @get('/person-has-profession-specialties')
  @response(200, {
    description: 'Array of PersonHasProfessionSpecialty model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PersonHasProfessionSpecialty, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PersonHasProfessionSpecialty) filter?: Filter<PersonHasProfessionSpecialty>,
  ): Promise<PersonHasProfessionSpecialty[]> {
    return this.personHasProfessionSpecialtyRepository.find(filter);
  }

  @patch('/person-has-profession-specialties')
  @response(200, {
    description: 'PersonHasProfessionSpecialty PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonHasProfessionSpecialty, {partial: true}),
        },
      },
    })
    personHasProfessionSpecialty: PersonHasProfessionSpecialty,
    @param.where(PersonHasProfessionSpecialty) where?: Where<PersonHasProfessionSpecialty>,
  ): Promise<Count> {
    return this.personHasProfessionSpecialtyRepository.updateAll(personHasProfessionSpecialty, where);
  }

  @get('/person-has-profession-specialties/{id}')
  @response(200, {
    description: 'PersonHasProfessionSpecialty model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PersonHasProfessionSpecialty, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PersonHasProfessionSpecialty, {exclude: 'where'}) filter?: FilterExcludingWhere<PersonHasProfessionSpecialty>
  ): Promise<PersonHasProfessionSpecialty> {
    return this.personHasProfessionSpecialtyRepository.findById(id, filter);
  }

  @patch('/person-has-profession-specialties/{id}')
  @response(204, {
    description: 'PersonHasProfessionSpecialty PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonHasProfessionSpecialty, {partial: true}),
        },
      },
    })
    personHasProfessionSpecialty: PersonHasProfessionSpecialty,
  ): Promise<void> {
    await this.personHasProfessionSpecialtyRepository.updateById(id, personHasProfessionSpecialty);
  }

  @put('/person-has-profession-specialties/{id}')
  @response(204, {
    description: 'PersonHasProfessionSpecialty PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() personHasProfessionSpecialty: PersonHasProfessionSpecialty,
  ): Promise<void> {
    await this.personHasProfessionSpecialtyRepository.replaceById(id, personHasProfessionSpecialty);
  }

  @del('/person-has-profession-specialties/{id}')
  @response(204, {
    description: 'PersonHasProfessionSpecialty DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personHasProfessionSpecialtyRepository.deleteById(id);
  }
}
