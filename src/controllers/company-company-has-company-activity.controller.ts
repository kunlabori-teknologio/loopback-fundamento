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
  Company,
  CompanyHasCompanyActivity
} from '../models';
import {CompanyRepository} from '../repositories';

@authenticate('jwt')
export class CompanyCompanyHasCompanyActivityController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/company-has-company-activities', {
    responses: {
      '200': {
        description: 'Array of Company has many CompanyHasCompanyActivity',
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
    return this.companyRepository.companyHasCompanyActivities(id).find(filter);
  }

  @post('/companies/{id}/company-has-company-activities', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyHasCompanyActivity)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasCompanyActivity, {
            title: 'NewCompanyHasCompanyActivityInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) companyHasCompanyActivity: Omit<CompanyHasCompanyActivity, 'id'>,
  ): Promise<CompanyHasCompanyActivity> {
    return this.companyRepository.companyHasCompanyActivities(id).create(companyHasCompanyActivity);
  }

  @patch('/companies/{id}/company-has-company-activities', {
    responses: {
      '200': {
        description: 'Company.CompanyHasCompanyActivity PATCH success count',
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
    return this.companyRepository.companyHasCompanyActivities(id).patch(companyHasCompanyActivity, where);
  }

  @del('/companies/{id}/company-has-company-activities', {
    responses: {
      '200': {
        description: 'Company.CompanyHasCompanyActivity DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CompanyHasCompanyActivity)) where?: Where<CompanyHasCompanyActivity>,
  ): Promise<Count> {
    return this.companyRepository.companyHasCompanyActivities(id).delete(where);
  }
}
