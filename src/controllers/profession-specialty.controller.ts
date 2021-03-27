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
import {ProfessionSpecialty} from '../models';
import {ProfessionSpecialtyRepository} from '../repositories';

@authenticate('jwt')
export class ProfessionSpecialtyController {
  constructor(
    @repository(ProfessionSpecialtyRepository)
    public professionSpecialtyRepository : ProfessionSpecialtyRepository,
  ) {}

  @post('/profession-specialties')
  @response(200, {
    description: 'ProfessionSpecialty model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProfessionSpecialty)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfessionSpecialty, {
            title: 'NewProfessionSpecialty',
            exclude: ['id'],
          }),
        },
      },
    })
    professionSpecialty: Omit<ProfessionSpecialty, 'id'>,
  ): Promise<ProfessionSpecialty> {
    return this.professionSpecialtyRepository.create(professionSpecialty);
  }

  @get('/profession-specialties/count')
  @response(200, {
    description: 'ProfessionSpecialty model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProfessionSpecialty) where?: Where<ProfessionSpecialty>,
  ): Promise<Count> {
    return this.professionSpecialtyRepository.count(where);
  }

  @get('/profession-specialties')
  @response(200, {
    description: 'Array of ProfessionSpecialty model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProfessionSpecialty, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProfessionSpecialty) filter?: Filter<ProfessionSpecialty>,
  ): Promise<ProfessionSpecialty[]> {
    return this.professionSpecialtyRepository.find(filter);
  }

  @patch('/profession-specialties')
  @response(200, {
    description: 'ProfessionSpecialty PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfessionSpecialty, {partial: true}),
        },
      },
    })
    professionSpecialty: ProfessionSpecialty,
    @param.where(ProfessionSpecialty) where?: Where<ProfessionSpecialty>,
  ): Promise<Count> {
    return this.professionSpecialtyRepository.updateAll(professionSpecialty, where);
  }

  @get('/profession-specialties/{id}')
  @response(200, {
    description: 'ProfessionSpecialty model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProfessionSpecialty, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProfessionSpecialty, {exclude: 'where'}) filter?: FilterExcludingWhere<ProfessionSpecialty>
  ): Promise<ProfessionSpecialty> {
    return this.professionSpecialtyRepository.findById(id, filter);
  }

  @patch('/profession-specialties/{id}')
  @response(204, {
    description: 'ProfessionSpecialty PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfessionSpecialty, {partial: true}),
        },
      },
    })
    professionSpecialty: ProfessionSpecialty,
  ): Promise<void> {
    await this.professionSpecialtyRepository.updateById(id, professionSpecialty);
  }

  @put('/profession-specialties/{id}')
  @response(204, {
    description: 'ProfessionSpecialty PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() professionSpecialty: ProfessionSpecialty,
  ): Promise<void> {
    await this.professionSpecialtyRepository.replaceById(id, professionSpecialty);
  }

  @del('/profession-specialties/{id}')
  @response(204, {
    description: 'ProfessionSpecialty DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.professionSpecialtyRepository.deleteById(id);
  }
}
