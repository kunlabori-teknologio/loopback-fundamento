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
import {ScheduleSetting} from '../models';
import {ScheduleSettingRepository} from '../repositories';

@authenticate('jwt')
export class ScheduleSettingController {
  constructor(
    @repository(ScheduleSettingRepository)
    public scheduleSettingRepository : ScheduleSettingRepository,
  ) {}

  @post('/schedule-settings')
  @response(200, {
    description: 'ScheduleSetting model instance',
    content: {'application/json': {schema: getModelSchemaRef(ScheduleSetting)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleSetting, {
            title: 'NewScheduleSetting',
            exclude: ['id'],
          }),
        },
      },
    })
    scheduleSetting: Omit<ScheduleSetting, 'id'>,
  ): Promise<ScheduleSetting> {
    return this.scheduleSettingRepository.create(scheduleSetting);
  }

  @get('/schedule-settings/count')
  @response(200, {
    description: 'ScheduleSetting model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ScheduleSetting) where?: Where<ScheduleSetting>,
  ): Promise<Count> {
    return this.scheduleSettingRepository.count(where);
  }

  @get('/schedule-settings')
  @response(200, {
    description: 'Array of ScheduleSetting model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ScheduleSetting, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ScheduleSetting) filter?: Filter<ScheduleSetting>,
  ): Promise<ScheduleSetting[]> {
    return this.scheduleSettingRepository.find(filter);
  }

  @patch('/schedule-settings')
  @response(200, {
    description: 'ScheduleSetting PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleSetting, {partial: true}),
        },
      },
    })
    scheduleSetting: ScheduleSetting,
    @param.where(ScheduleSetting) where?: Where<ScheduleSetting>,
  ): Promise<Count> {
    return this.scheduleSettingRepository.updateAll(scheduleSetting, where);
  }

  @get('/schedule-settings/{id}')
  @response(200, {
    description: 'ScheduleSetting model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ScheduleSetting, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ScheduleSetting, {exclude: 'where'}) filter?: FilterExcludingWhere<ScheduleSetting>
  ): Promise<ScheduleSetting> {
    return this.scheduleSettingRepository.findById(id, filter);
  }

  @patch('/schedule-settings/{id}')
  @response(204, {
    description: 'ScheduleSetting PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleSetting, {partial: true}),
        },
      },
    })
    scheduleSetting: ScheduleSetting,
  ): Promise<void> {
    await this.scheduleSettingRepository.updateById(id, scheduleSetting);
  }

  @put('/schedule-settings/{id}')
  @response(204, {
    description: 'ScheduleSetting PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() scheduleSetting: ScheduleSetting,
  ): Promise<void> {
    await this.scheduleSettingRepository.replaceById(id, scheduleSetting);
  }

  @del('/schedule-settings/{id}')
  @response(204, {
    description: 'ScheduleSetting DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.scheduleSettingRepository.deleteById(id);
  }
}
