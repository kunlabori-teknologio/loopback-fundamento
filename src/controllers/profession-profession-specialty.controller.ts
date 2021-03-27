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
  Profession,
  ProfessionSpecialty
} from '../models';
import {ProfessionRepository} from '../repositories';

@authenticate('jwt')
export class ProfessionProfessionSpecialtyController {
  constructor(
    @repository(ProfessionRepository) protected professionRepository: ProfessionRepository,
  ) { }

  @get('/professions/{id}/profession-specialties', {
    responses: {
      '200': {
        description: 'Array of Profession has many ProfessionSpecialty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProfessionSpecialty)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProfessionSpecialty>,
  ): Promise<ProfessionSpecialty[]> {
    return this.professionRepository.professionSpecialties(id).find(filter);
  }

  @post('/professions/{id}/profession-specialties', {
    responses: {
      '200': {
        description: 'Profession model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProfessionSpecialty)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Profession.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfessionSpecialty, {
            title: 'NewProfessionSpecialtyInProfession',
            exclude: ['id'],
            optional: ['professionId']
          }),
        },
      },
    }) professionSpecialty: Omit<ProfessionSpecialty, 'id'>,
  ): Promise<ProfessionSpecialty> {
    return this.professionRepository.professionSpecialties(id).create(professionSpecialty);
  }

  @patch('/professions/{id}/profession-specialties', {
    responses: {
      '200': {
        description: 'Profession.ProfessionSpecialty PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfessionSpecialty, {partial: true}),
        },
      },
    })
    professionSpecialty: Partial<ProfessionSpecialty>,
    @param.query.object('where', getWhereSchemaFor(ProfessionSpecialty)) where?: Where<ProfessionSpecialty>,
  ): Promise<Count> {
    return this.professionRepository.professionSpecialties(id).patch(professionSpecialty, where);
  }

  @del('/professions/{id}/profession-specialties', {
    responses: {
      '200': {
        description: 'Profession.ProfessionSpecialty DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProfessionSpecialty)) where?: Where<ProfessionSpecialty>,
  ): Promise<Count> {
    return this.professionRepository.professionSpecialties(id).delete(where);
  }
}
