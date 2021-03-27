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
  CompanyActivity,
  CompanyHasCompanyActivity
} from '../models';
import {CompanyActivityRepository} from '../repositories';

@authenticate('jwt')
export class CompanyActivityCompanyHasCompanyActivityController {
  constructor(
    @repository(CompanyActivityRepository) protected companyActivityRepository: CompanyActivityRepository,
  ) { }

  @get('/company-activities/{id}/company-has-company-activities', {
    responses: {
      '200': {
        description: 'Array of CompanyActivity has many CompanyHasCompanyActivity',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CompanyHasCompanyActivity)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CompanyHasCompanyActivity>,
  ): Promise<CompanyHasCompanyActivity[]> {
    return this.companyActivityRepository.companyHasCompanyActivities(id).find(filter);
  }

  @post('/company-activities/{id}/company-has-company-activities', {
    responses: {
      '200': {
        description: 'CompanyActivity model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyHasCompanyActivity)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CompanyActivity.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasCompanyActivity, {
            title: 'NewCompanyHasCompanyActivityInCompanyActivity',
            exclude: ['id'],
            optional: ['companyActivityId']
          }),
        },
      },
    }) companyHasCompanyActivity: Omit<CompanyHasCompanyActivity, 'id'>,
  ): Promise<CompanyHasCompanyActivity> {
    return this.companyActivityRepository.companyHasCompanyActivities(id).create(companyHasCompanyActivity);
  }

  @patch('/company-activities/{id}/company-has-company-activities', {
    responses: {
      '200': {
        description: 'CompanyActivity.CompanyHasCompanyActivity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasCompanyActivity, {partial: true}),
        },
      },
    })
    companyHasCompanyActivity: Partial<CompanyHasCompanyActivity>,
    @param.query.object('where', getWhereSchemaFor(CompanyHasCompanyActivity)) where?: Where<CompanyHasCompanyActivity>,
  ): Promise<Count> {
    return this.companyActivityRepository.companyHasCompanyActivities(id).patch(companyHasCompanyActivity, where);
  }

  @del('/company-activities/{id}/company-has-company-activities', {
    responses: {
      '200': {
        description: 'CompanyActivity.CompanyHasCompanyActivity DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CompanyHasCompanyActivity)) where?: Where<CompanyHasCompanyActivity>,
  ): Promise<Count> {
    return this.companyActivityRepository.companyHasCompanyActivities(id).delete(where);
  }
}
