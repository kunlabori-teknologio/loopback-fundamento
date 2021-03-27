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
  Profession, ProfessionArea
} from '../models';
import {ProfessionAreaRepository} from '../repositories';

@authenticate('jwt')
export class ProfessionAreaProfessionController {
  constructor(
    @repository(ProfessionAreaRepository) protected professionAreaRepository: ProfessionAreaRepository,
  ) { }

  @get('/profession-areas/{id}/professions', {
    responses: {
      '200': {
        description: 'Array of ProfessionArea has many Profession',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profession)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Profession>,
  ): Promise<Profession[]> {
    return this.professionAreaRepository.professions(id).find(filter);
  }

  @post('/profession-areas/{id}/professions', {
    responses: {
      '200': {
        description: 'ProfessionArea model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profession)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProfessionArea.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profession, {
            title: 'NewProfessionInProfessionArea',
            exclude: ['id'],
            optional: ['professionAreaId']
          }),
        },
      },
    }) profession: Omit<Profession, 'id'>,
  ): Promise<Profession> {
    return this.professionAreaRepository.professions(id).create(profession);
  }

  @patch('/profession-areas/{id}/professions', {
    responses: {
      '200': {
        description: 'ProfessionArea.Profession PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profession, {partial: true}),
        },
      },
    })
    profession: Partial<Profession>,
    @param.query.object('where', getWhereSchemaFor(Profession)) where?: Where<Profession>,
  ): Promise<Count> {
    return this.professionAreaRepository.professions(id).patch(profession, where);
  }

  @del('/profession-areas/{id}/professions', {
    responses: {
      '200': {
        description: 'ProfessionArea.Profession DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Profession)) where?: Where<Profession>,
  ): Promise<Count> {
    return this.professionAreaRepository.professions(id).delete(where);
  }
}
