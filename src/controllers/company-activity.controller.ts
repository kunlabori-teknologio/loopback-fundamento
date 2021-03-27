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
import {CompanyActivity} from '../models';
import {CompanyActivityRepository} from '../repositories';

@authenticate('jwt')
export class CompanyActivityController {
  constructor(
    @repository(CompanyActivityRepository)
    public companyActivityRepository : CompanyActivityRepository,
  ) {}

  @post('/company-activities')
  @response(200, {
    description: 'CompanyActivity model instance',
    content: {'application/json': {schema: getModelSchemaRef(CompanyActivity)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyActivity, {
            title: 'NewCompanyActivity',
            exclude: ['id'],
          }),
        },
      },
    })
    companyActivity: Omit<CompanyActivity, 'id'>,
  ): Promise<CompanyActivity> {
    return this.companyActivityRepository.create(companyActivity);
  }

  @get('/company-activities/count')
  @response(200, {
    description: 'CompanyActivity model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CompanyActivity) where?: Where<CompanyActivity>,
  ): Promise<Count> {
    return this.companyActivityRepository.count(where);
  }

  @get('/company-activities')
  @response(200, {
    description: 'Array of CompanyActivity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CompanyActivity, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CompanyActivity) filter?: Filter<CompanyActivity>,
  ): Promise<CompanyActivity[]> {
    return this.companyActivityRepository.find(filter);
  }

  @patch('/company-activities')
  @response(200, {
    description: 'CompanyActivity PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyActivity, {partial: true}),
        },
      },
    })
    companyActivity: CompanyActivity,
    @param.where(CompanyActivity) where?: Where<CompanyActivity>,
  ): Promise<Count> {
    return this.companyActivityRepository.updateAll(companyActivity, where);
  }

  @get('/company-activities/{id}')
  @response(200, {
    description: 'CompanyActivity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompanyActivity, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CompanyActivity, {exclude: 'where'}) filter?: FilterExcludingWhere<CompanyActivity>
  ): Promise<CompanyActivity> {
    return this.companyActivityRepository.findById(id, filter);
  }

  @patch('/company-activities/{id}')
  @response(204, {
    description: 'CompanyActivity PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyActivity, {partial: true}),
        },
      },
    })
    companyActivity: CompanyActivity,
  ): Promise<void> {
    await this.companyActivityRepository.updateById(id, companyActivity);
  }

  @put('/company-activities/{id}')
  @response(204, {
    description: 'CompanyActivity PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() companyActivity: CompanyActivity,
  ): Promise<void> {
    await this.companyActivityRepository.replaceById(id, companyActivity);
  }

  @del('/company-activities/{id}')
  @response(204, {
    description: 'CompanyActivity DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyActivityRepository.deleteById(id);
  }
}
