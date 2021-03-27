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
import {CompanyHasCompanyActivity} from '../models';
import {CompanyHasCompanyActivityRepository} from '../repositories';

@authenticate('jwt')
export class CompanyHasCompanyActivityController {
  constructor(
    @repository(CompanyHasCompanyActivityRepository)
    public companyHasCompanyActivityRepository : CompanyHasCompanyActivityRepository,
  ) {}

  @post('/company-has-company-activities')
  @response(200, {
    description: 'CompanyHasCompanyActivity model instance',
    content: {'application/json': {schema: getModelSchemaRef(CompanyHasCompanyActivity)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasCompanyActivity, {
            title: 'NewCompanyHasCompanyActivity',
            exclude: ['id'],
          }),
        },
      },
    })
    companyHasCompanyActivity: Omit<CompanyHasCompanyActivity, 'id'>,
  ): Promise<CompanyHasCompanyActivity> {
    return this.companyHasCompanyActivityRepository.create(companyHasCompanyActivity);
  }

  @get('/company-has-company-activities/count')
  @response(200, {
    description: 'CompanyHasCompanyActivity model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CompanyHasCompanyActivity) where?: Where<CompanyHasCompanyActivity>,
  ): Promise<Count> {
    return this.companyHasCompanyActivityRepository.count(where);
  }

  @get('/company-has-company-activities')
  @response(200, {
    description: 'Array of CompanyHasCompanyActivity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CompanyHasCompanyActivity, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CompanyHasCompanyActivity) filter?: Filter<CompanyHasCompanyActivity>,
  ): Promise<CompanyHasCompanyActivity[]> {
    return this.companyHasCompanyActivityRepository.find(filter);
  }

  @patch('/company-has-company-activities')
  @response(200, {
    description: 'CompanyHasCompanyActivity PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasCompanyActivity, {partial: true}),
        },
      },
    })
    companyHasCompanyActivity: CompanyHasCompanyActivity,
    @param.where(CompanyHasCompanyActivity) where?: Where<CompanyHasCompanyActivity>,
  ): Promise<Count> {
    return this.companyHasCompanyActivityRepository.updateAll(companyHasCompanyActivity, where);
  }

  @get('/company-has-company-activities/{id}')
  @response(200, {
    description: 'CompanyHasCompanyActivity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompanyHasCompanyActivity, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CompanyHasCompanyActivity, {exclude: 'where'}) filter?: FilterExcludingWhere<CompanyHasCompanyActivity>
  ): Promise<CompanyHasCompanyActivity> {
    return this.companyHasCompanyActivityRepository.findById(id, filter);
  }

  @patch('/company-has-company-activities/{id}')
  @response(204, {
    description: 'CompanyHasCompanyActivity PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasCompanyActivity, {partial: true}),
        },
      },
    })
    companyHasCompanyActivity: CompanyHasCompanyActivity,
  ): Promise<void> {
    await this.companyHasCompanyActivityRepository.updateById(id, companyHasCompanyActivity);
  }

  @put('/company-has-company-activities/{id}')
  @response(204, {
    description: 'CompanyHasCompanyActivity PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() companyHasCompanyActivity: CompanyHasCompanyActivity,
  ): Promise<void> {
    await this.companyHasCompanyActivityRepository.replaceById(id, companyHasCompanyActivity);
  }

  @del('/company-has-company-activities/{id}')
  @response(204, {
    description: 'CompanyHasCompanyActivity DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyHasCompanyActivityRepository.deleteById(id);
  }
}
