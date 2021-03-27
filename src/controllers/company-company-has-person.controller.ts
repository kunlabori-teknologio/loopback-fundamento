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
  CompanyHasPerson
} from '../models';
import {CompanyRepository} from '../repositories';

@authenticate('jwt')
export class CompanyCompanyHasPersonController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/company-has-people', {
    responses: {
      '200': {
        description: 'Array of Company has many CompanyHasPerson',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CompanyHasPerson)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CompanyHasPerson>,
  ): Promise<CompanyHasPerson[]> {
    return this.companyRepository.companyHasPeople(id).find(filter);
  }

  @post('/companies/{id}/company-has-people', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyHasPerson)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPerson, {
            title: 'NewCompanyHasPersonInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) companyHasPerson: Omit<CompanyHasPerson, 'id'>,
  ): Promise<CompanyHasPerson> {
    return this.companyRepository.companyHasPeople(id).create(companyHasPerson);
  }

  @patch('/companies/{id}/company-has-people', {
    responses: {
      '200': {
        description: 'Company.CompanyHasPerson PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPerson, {partial: true}),
        },
      },
    })
    companyHasPerson: Partial<CompanyHasPerson>,
    @param.query.object('where', getWhereSchemaFor(CompanyHasPerson)) where?: Where<CompanyHasPerson>,
  ): Promise<Count> {
    return this.companyRepository.companyHasPeople(id).patch(companyHasPerson, where);
  }

  @del('/companies/{id}/company-has-people', {
    responses: {
      '200': {
        description: 'Company.CompanyHasPerson DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CompanyHasPerson)) where?: Where<CompanyHasPerson>,
  ): Promise<Count> {
    return this.companyRepository.companyHasPeople(id).delete(where);
  }
}
