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
  Schedule,
  ScheduleParticipant
} from '../models';
import {ScheduleRepository} from '../repositories';

@authenticate('jwt')
export class ScheduleScheduleParticipantController {
  constructor(
    @repository(ScheduleRepository) protected scheduleRepository: ScheduleRepository,
  ) { }

  @get('/schedules/{id}/schedule-participants', {
    responses: {
      '200': {
        description: 'Array of Schedule has many ScheduleParticipant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ScheduleParticipant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ScheduleParticipant>,
  ): Promise<ScheduleParticipant[]> {
    return this.scheduleRepository.scheduleParticipants(id).find(filter);
  }

  @post('/schedules/{id}/schedule-participants', {
    responses: {
      '200': {
        description: 'Schedule model instance',
        content: {'application/json': {schema: getModelSchemaRef(ScheduleParticipant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Schedule.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleParticipant, {
            title: 'NewScheduleParticipantInSchedule',
            exclude: ['id'],
            optional: ['scheduleId']
          }),
        },
      },
    }) scheduleParticipant: Omit<ScheduleParticipant, 'id'>,
  ): Promise<ScheduleParticipant> {
    return this.scheduleRepository.scheduleParticipants(id).create(scheduleParticipant);
  }

  @patch('/schedules/{id}/schedule-participants', {
    responses: {
      '200': {
        description: 'Schedule.ScheduleParticipant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleParticipant, {partial: true}),
        },
      },
    })
    scheduleParticipant: Partial<ScheduleParticipant>,
    @param.query.object('where', getWhereSchemaFor(ScheduleParticipant)) where?: Where<ScheduleParticipant>,
  ): Promise<Count> {
    return this.scheduleRepository.scheduleParticipants(id).patch(scheduleParticipant, where);
  }

  @del('/schedules/{id}/schedule-participants', {
    responses: {
      '200': {
        description: 'Schedule.ScheduleParticipant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ScheduleParticipant)) where?: Where<ScheduleParticipant>,
  ): Promise<Count> {
    return this.scheduleRepository.scheduleParticipants(id).delete(where);
  }
}
