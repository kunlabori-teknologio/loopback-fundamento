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
import {ScheduleParticipant} from '../models';
import {ScheduleParticipantRepository} from '../repositories';

@authenticate('jwt')
export class ScheduleParticipantController {
  constructor(
    @repository(ScheduleParticipantRepository)
    public scheduleParticipantRepository : ScheduleParticipantRepository,
  ) {}

  @post('/schedule-participants')
  @response(200, {
    description: 'ScheduleParticipant model instance',
    content: {'application/json': {schema: getModelSchemaRef(ScheduleParticipant)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleParticipant, {
            title: 'NewScheduleParticipant',
            exclude: ['id'],
          }),
        },
      },
    })
    scheduleParticipant: Omit<ScheduleParticipant, 'id'>,
  ): Promise<ScheduleParticipant> {
    return this.scheduleParticipantRepository.create(scheduleParticipant);
  }

  @get('/schedule-participants/count')
  @response(200, {
    description: 'ScheduleParticipant model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ScheduleParticipant) where?: Where<ScheduleParticipant>,
  ): Promise<Count> {
    return this.scheduleParticipantRepository.count(where);
  }

  @get('/schedule-participants')
  @response(200, {
    description: 'Array of ScheduleParticipant model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ScheduleParticipant, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ScheduleParticipant) filter?: Filter<ScheduleParticipant>,
  ): Promise<ScheduleParticipant[]> {
    return this.scheduleParticipantRepository.find(filter);
  }

  @patch('/schedule-participants')
  @response(200, {
    description: 'ScheduleParticipant PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleParticipant, {partial: true}),
        },
      },
    })
    scheduleParticipant: ScheduleParticipant,
    @param.where(ScheduleParticipant) where?: Where<ScheduleParticipant>,
  ): Promise<Count> {
    return this.scheduleParticipantRepository.updateAll(scheduleParticipant, where);
  }

  @get('/schedule-participants/{id}')
  @response(200, {
    description: 'ScheduleParticipant model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ScheduleParticipant, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ScheduleParticipant, {exclude: 'where'}) filter?: FilterExcludingWhere<ScheduleParticipant>
  ): Promise<ScheduleParticipant> {
    return this.scheduleParticipantRepository.findById(id, filter);
  }

  @patch('/schedule-participants/{id}')
  @response(204, {
    description: 'ScheduleParticipant PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleParticipant, {partial: true}),
        },
      },
    })
    scheduleParticipant: ScheduleParticipant,
  ): Promise<void> {
    await this.scheduleParticipantRepository.updateById(id, scheduleParticipant);
  }

  @put('/schedule-participants/{id}')
  @response(204, {
    description: 'ScheduleParticipant PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() scheduleParticipant: ScheduleParticipant,
  ): Promise<void> {
    await this.scheduleParticipantRepository.replaceById(id, scheduleParticipant);
  }

  @del('/schedule-participants/{id}')
  @response(204, {
    description: 'ScheduleParticipant DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.scheduleParticipantRepository.deleteById(id);
  }
}
