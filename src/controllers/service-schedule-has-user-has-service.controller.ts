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
  ScheduleHasUserHasService, Service
} from '../models';
import {ServiceRepository} from '../repositories';

@authenticate('jwt')
export class ServiceScheduleHasUserHasServiceController {
  constructor(
    @repository(ServiceRepository) protected serviceRepository: ServiceRepository,
  ) { }

  @get('/services/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Array of Service has many ScheduleHasUserHasService',
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
    return this.serviceRepository.scheduleHasUserHasServices(id).find(filter);
  }

  @post('/services/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Service model instance',
        content: {'application/json': {schema: getModelSchemaRef(ScheduleHasUserHasService)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Service.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleHasUserHasService, {
            title: 'NewScheduleHasUserHasServiceInService',
            exclude: ['id'],
            optional: ['serviceId']
          }),
        },
      },
    }) scheduleHasUserHasService: Omit<ScheduleHasUserHasService, 'id'>,
  ): Promise<ScheduleHasUserHasService> {
    return this.serviceRepository.scheduleHasUserHasServices(id).create(scheduleHasUserHasService);
  }

  @patch('/services/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Service.ScheduleHasUserHasService PATCH success count',
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
    return this.serviceRepository.scheduleHasUserHasServices(id).patch(scheduleHasUserHasService, where);
  }

  @del('/services/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Service.ScheduleHasUserHasService DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ScheduleHasUserHasService)) where?: Where<ScheduleHasUserHasService>,
  ): Promise<Count> {
    return this.serviceRepository.scheduleHasUserHasServices(id).delete(where);
  }
}
