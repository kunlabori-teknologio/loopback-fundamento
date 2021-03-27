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
  ScheduleSetting, UserExtended
} from '../models';
import {UserExtendedRepository} from '../repositories';

@authenticate('jwt')
export class UserExtendedScheduleSettingController {
  constructor(
    @repository(UserExtendedRepository) protected userExtendedRepository: UserExtendedRepository,
  ) { }

  @get('/user-extendeds/{id}/schedule-settings', {
    responses: {
      '200': {
        description: 'Array of UserExtended has many ScheduleSetting',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ScheduleSetting)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ScheduleSetting>,
  ): Promise<ScheduleSetting[]> {
    return this.userExtendedRepository.scheduleSettings(id).find(filter);
  }

  @post('/user-extendeds/{id}/schedule-settings', {
    responses: {
      '200': {
        description: 'UserExtended model instance',
        content: {'application/json': {schema: getModelSchemaRef(ScheduleSetting)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserExtended.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleSetting, {
            title: 'NewScheduleSettingInUserExtended',
            exclude: ['id'],
            optional: ['userExtendedId']
          }),
        },
      },
    }) scheduleSetting: Omit<ScheduleSetting, 'id'>,
  ): Promise<ScheduleSetting> {
    return this.userExtendedRepository.scheduleSettings(id).create(scheduleSetting);
  }

  @patch('/user-extendeds/{id}/schedule-settings', {
    responses: {
      '200': {
        description: 'UserExtended.ScheduleSetting PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleSetting, {partial: true}),
        },
      },
    })
    scheduleSetting: Partial<ScheduleSetting>,
    @param.query.object('where', getWhereSchemaFor(ScheduleSetting)) where?: Where<ScheduleSetting>,
  ): Promise<Count> {
    return this.userExtendedRepository.scheduleSettings(id).patch(scheduleSetting, where);
  }

  @del('/user-extendeds/{id}/schedule-settings', {
    responses: {
      '200': {
        description: 'UserExtended.ScheduleSetting DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ScheduleSetting)) where?: Where<ScheduleSetting>,
  ): Promise<Count> {
    return this.userExtendedRepository.scheduleSettings(id).delete(where);
  }
}
