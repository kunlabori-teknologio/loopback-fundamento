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
import {ProfessionArea} from '../models';
import {ProfessionAreaRepository} from '../repositories';

@authenticate('jwt')
export class ProfessionAreaController {
  constructor(
    @repository(ProfessionAreaRepository)
    public professionAreaRepository : ProfessionAreaRepository,
  ) {}

  @post('/profession-areas')
  @response(200, {
    description: 'ProfessionArea model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProfessionArea)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfessionArea, {
            title: 'NewProfessionArea',
            exclude: ['id'],
          }),
        },
      },
    })
    professionArea: Omit<ProfessionArea, 'id'>,
  ): Promise<ProfessionArea> {
    return this.professionAreaRepository.create(professionArea);
  }

  @get('/profession-areas/count')
  @response(200, {
    description: 'ProfessionArea model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProfessionArea) where?: Where<ProfessionArea>,
  ): Promise<Count> {
    return this.professionAreaRepository.count(where);
  }

  @get('/profession-areas')
  @response(200, {
    description: 'Array of ProfessionArea model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProfessionArea, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProfessionArea) filter?: Filter<ProfessionArea>,
  ): Promise<ProfessionArea[]> {
    return this.professionAreaRepository.find(filter);
  }

  @patch('/profession-areas')
  @response(200, {
    description: 'ProfessionArea PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfessionArea, {partial: true}),
        },
      },
    })
    professionArea: ProfessionArea,
    @param.where(ProfessionArea) where?: Where<ProfessionArea>,
  ): Promise<Count> {
    return this.professionAreaRepository.updateAll(professionArea, where);
  }

  @get('/profession-areas/{id}')
  @response(200, {
    description: 'ProfessionArea model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProfessionArea, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProfessionArea, {exclude: 'where'}) filter?: FilterExcludingWhere<ProfessionArea>
  ): Promise<ProfessionArea> {
    return this.professionAreaRepository.findById(id, filter);
  }

  @patch('/profession-areas/{id}')
  @response(204, {
    description: 'ProfessionArea PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfessionArea, {partial: true}),
        },
      },
    })
    professionArea: ProfessionArea,
  ): Promise<void> {
    await this.professionAreaRepository.updateById(id, professionArea);
  }

  @put('/profession-areas/{id}')
  @response(204, {
    description: 'ProfessionArea PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() professionArea: ProfessionArea,
  ): Promise<void> {
    await this.professionAreaRepository.replaceById(id, professionArea);
  }

  @del('/profession-areas/{id}')
  @response(204, {
    description: 'ProfessionArea DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.professionAreaRepository.deleteById(id);
  }
}
