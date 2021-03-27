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
  ScheduleHasUserHasService
} from '../models';
import {ScheduleRepository} from '../repositories';

@authenticate('jwt')
export class ScheduleScheduleHasUserHasServiceController {
  constructor(
    @repository(ScheduleRepository) protected scheduleRepository: ScheduleRepository,
  ) { }

  @get('/schedules/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Array of Schedule has many ScheduleHasUserHasService',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ScheduleHasUserHasService)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ScheduleHasUserHasService>,
  ): Promise<ScheduleHasUserHasService[]> {
    return this.scheduleRepository.scheduleHasUserHasServices(id).find(filter);
  }

  @post('/schedules/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Schedule model instance',
        content: {'application/json': {schema: getModelSchemaRef(ScheduleHasUserHasService)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Schedule.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleHasUserHasService, {
            title: 'NewScheduleHasUserHasServiceInSchedule',
            exclude: ['id'],
            optional: ['scheduleId']
          }),
        },
      },
    }) scheduleHasUserHasService: Omit<ScheduleHasUserHasService, 'id'>,
  ): Promise<ScheduleHasUserHasService> {
    return this.scheduleRepository.scheduleHasUserHasServices(id).create(scheduleHasUserHasService);
  }

  @patch('/schedules/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Schedule.ScheduleHasUserHasService PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleHasUserHasService, {partial: true}),
        },
      },
    })
    scheduleHasUserHasService: Partial<ScheduleHasUserHasService>,
    @param.query.object('where', getWhereSchemaFor(ScheduleHasUserHasService)) where?: Where<ScheduleHasUserHasService>,
  ): Promise<Count> {
    return this.scheduleRepository.scheduleHasUserHasServices(id).patch(scheduleHasUserHasService, where);
  }

  @del('/schedules/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Schedule.ScheduleHasUserHasService DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ScheduleHasUserHasService)) where?: Where<ScheduleHasUserHasService>,
  ): Promise<Count> {
    return this.scheduleRepository.scheduleHasUserHasServices(id).delete(where);
  }
}
