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
import {Profession} from '../models';
import {ProfessionRepository} from '../repositories';

@authenticate('jwt')
export class ProfessionController {
  constructor(
    @repository(ProfessionRepository)
    public professionRepository : ProfessionRepository,
  ) {}

  @post('/professions')
  @response(200, {
    description: 'Profession model instance',
    content: {'application/json': {schema: getModelSchemaRef(Profession)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profession, {
            title: 'NewProfession',
            exclude: ['id'],
          }),
        },
      },
    })
    profession: Omit<Profession, 'id'>,
  ): Promise<Profession> {
    return this.professionRepository.create(profession);
  }

  @get('/professions/count')
  @response(200, {
    description: 'Profession model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Profession) where?: Where<Profession>,
  ): Promise<Count> {
    return this.professionRepository.count(where);
  }

  @get('/professions')
  @response(200, {
    description: 'Array of Profession model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Profession, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Profession) filter?: Filter<Profession>,
  ): Promise<Profession[]> {
    return this.professionRepository.find(filter);
  }

  @patch('/professions')
  @response(200, {
    description: 'Profession PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profession, {partial: true}),
        },
      },
    })
    profession: Profession,
    @param.where(Profession) where?: Where<Profession>,
  ): Promise<Count> {
    return this.professionRepository.updateAll(profession, where);
  }

  @get('/professions/{id}')
  @response(200, {
    description: 'Profession model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Profession, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Profession, {exclude: 'where'}) filter?: FilterExcludingWhere<Profession>
  ): Promise<Profession> {
    return this.professionRepository.findById(id, filter);
  }

  @patch('/professions/{id}')
  @response(204, {
    description: 'Profession PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profession, {partial: true}),
        },
      },
    })
    profession: Profession,
  ): Promise<void> {
    await this.professionRepository.updateById(id, profession);
  }

  @put('/professions/{id}')
  @response(204, {
    description: 'Profession PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() profession: Profession,
  ): Promise<void> {
    await this.professionRepository.replaceById(id, profession);
  }

  @del('/professions/{id}')
  @response(204, {
    description: 'Profession DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.professionRepository.deleteById(id);
  }
}
