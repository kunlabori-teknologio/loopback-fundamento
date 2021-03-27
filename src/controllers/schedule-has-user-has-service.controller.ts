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
import {ScheduleHasUserHasService} from '../models';
import {ScheduleHasUserHasServiceRepository} from '../repositories';

@authenticate('jwt')
export class ScheduleHasUserHasServiceController {
  constructor(
    @repository(ScheduleHasUserHasServiceRepository)
    public scheduleHasUserHasServiceRepository : ScheduleHasUserHasServiceRepository,
  ) {}

  @post('/schedule-has-user-has-services')
  @response(200, {
    description: 'ScheduleHasUserHasService model instance',
    content: {'application/json': {schema: getModelSchemaRef(ScheduleHasUserHasService)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleHasUserHasService, {
            title: 'NewScheduleHasUserHasService',
            exclude: ['id'],
          }),
        },
      },
    })
    scheduleHasUserHasService: Omit<ScheduleHasUserHasService, 'id'>,
  ): Promise<ScheduleHasUserHasService> {
    return this.scheduleHasUserHasServiceRepository.create(scheduleHasUserHasService);
  }

  @get('/schedule-has-user-has-services/count')
  @response(200, {
    description: 'ScheduleHasUserHasService model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ScheduleHasUserHasService) where?: Where<ScheduleHasUserHasService>,
  ): Promise<Count> {
    return this.scheduleHasUserHasServiceRepository.count(where);
  }

  @get('/schedule-has-user-has-services')
  @response(200, {
    description: 'Array of ScheduleHasUserHasService model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ScheduleHasUserHasService, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ScheduleHasUserHasService) filter?: Filter<ScheduleHasUserHasService>,
  ): Promise<ScheduleHasUserHasService[]> {
    return this.scheduleHasUserHasServiceRepository.find(filter);
  }

  @patch('/schedule-has-user-has-services')
  @response(200, {
    description: 'ScheduleHasUserHasService PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleHasUserHasService, {partial: true}),
        },
      },
    })
    scheduleHasUserHasService: ScheduleHasUserHasService,
    @param.where(ScheduleHasUserHasService) where?: Where<ScheduleHasUserHasService>,
  ): Promise<Count> {
    return this.scheduleHasUserHasServiceRepository.updateAll(scheduleHasUserHasService, where);
  }

  @get('/schedule-has-user-has-services/{id}')
  @response(200, {
    description: 'ScheduleHasUserHasService model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ScheduleHasUserHasService, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ScheduleHasUserHasService, {exclude: 'where'}) filter?: FilterExcludingWhere<ScheduleHasUserHasService>
  ): Promise<ScheduleHasUserHasService> {
    return this.scheduleHasUserHasServiceRepository.findById(id, filter);
  }

  @patch('/schedule-has-user-has-services/{id}')
  @response(204, {
    description: 'ScheduleHasUserHasService PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScheduleHasUserHasService, {partial: true}),
        },
      },
    })
    scheduleHasUserHasService: ScheduleHasUserHasService,
  ): Promise<void> {
    await this.scheduleHasUserHasServiceRepository.updateById(id, scheduleHasUserHasService);
  }

  @put('/schedule-has-user-has-services/{id}')
  @response(204, {
    description: 'ScheduleHasUserHasService PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() scheduleHasUserHasService: ScheduleHasUserHasService,
  ): Promise<void> {
    await this.scheduleHasUserHasServiceRepository.replaceById(id, scheduleHasUserHasService);
  }

  @del('/schedule-has-user-has-services/{id}')
  @response(204, {
    description: 'ScheduleHasUserHasService DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.scheduleHasUserHasServiceRepository.deleteById(id);
  }
}
