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
  ScheduleHasUserHasService, UserExtended
} from '../models';
import {UserExtendedRepository} from '../repositories';

@authenticate('jwt')
export class UserExtendedScheduleHasUserHasServiceController {
  constructor(
    @repository(UserExtendedRepository) protected userExtendedRepository: UserExtendedRepository,
  ) { }

  @get('/user-extendeds/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'Array of UserExtended has many ScheduleHasUserHasService',
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
    return this.userExtendedRepository.scheduleHasUserHasServices(id).find(filter);
  }

  @post('/user-extendeds/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'UserExtended model instance',
        content: {'application/json': {schema: getModelSchemaRef(ScheduleHasUserHasService)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserExtended.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleHasUserHasService, {
            title: 'NewScheduleHasUserHasServiceInUserExtended',
            exclude: ['id'],
            optional: ['userExtendedId']
          }),
        },
      },
    }) scheduleHasUserHasService: Omit<ScheduleHasUserHasService, 'id'>,
  ): Promise<ScheduleHasUserHasService> {
    return this.userExtendedRepository.scheduleHasUserHasServices(id).create(scheduleHasUserHasService);
  }

  @patch('/user-extendeds/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'UserExtended.ScheduleHasUserHasService PATCH success count',
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
    return this.userExtendedRepository.scheduleHasUserHasServices(id).patch(scheduleHasUserHasService, where);
  }

  @del('/user-extendeds/{id}/schedule-has-user-has-services', {
    responses: {
      '200': {
        description: 'UserExtended.ScheduleHasUserHasService DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ScheduleHasUserHasService)) where?: Where<ScheduleHasUserHasService>,
  ): Promise<Count> {
    return this.userExtendedRepository.scheduleHasUserHasServices(id).delete(where);
  }
}
