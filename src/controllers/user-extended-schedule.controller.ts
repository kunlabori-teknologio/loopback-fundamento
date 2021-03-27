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
  Schedule, UserExtended
} from '../models';
import {UserExtendedRepository} from '../repositories';

@authenticate('jwt')
export class UserExtendedScheduleController {
  constructor(
    @repository(UserExtendedRepository) protected userExtendedRepository: UserExtendedRepository,
  ) { }

  @get('/user-extendeds/{id}/schedules', {
    responses: {
      '200': {
        description: 'Array of UserExtended has many Schedule',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Schedule)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Schedule>,
  ): Promise<Schedule[]> {
    return this.userExtendedRepository.schedules(id).find(filter);
  }

  @post('/user-extendeds/{id}/schedules', {
    responses: {
      '200': {
        description: 'UserExtended model instance',
        content: {'application/json': {schema: getModelSchemaRef(Schedule)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserExtended.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {
            title: 'NewScheduleInUserExtended',
            exclude: ['id'],
            optional: ['userExtendedId']
          }),
        },
      },
    }) schedule: Omit<Schedule, 'id'>,
  ): Promise<Schedule> {
    return this.userExtendedRepository.schedules(id).create(schedule);
  }

  @patch('/user-extendeds/{id}/schedules', {
    responses: {
      '200': {
        description: 'UserExtended.Schedule PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {partial: true}),
        },
      },
    })
    schedule: Partial<Schedule>,
    @param.query.object('where', getWhereSchemaFor(Schedule)) where?: Where<Schedule>,
  ): Promise<Count> {
    return this.userExtendedRepository.schedules(id).patch(schedule, where);
  }

  @del('/user-extendeds/{id}/schedules', {
    responses: {
      '200': {
        description: 'UserExtended.Schedule DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Schedule)) where?: Where<Schedule>,
  ): Promise<Count> {
    return this.userExtendedRepository.schedules(id).delete(where);
  }
}
