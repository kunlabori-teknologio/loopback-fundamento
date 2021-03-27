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
import {CompanyHasPerson} from '../models';
import {CompanyHasPersonRepository} from '../repositories';

@authenticate('jwt')
export class CompanyHasPersonController {
  constructor(
    @repository(CompanyHasPersonRepository)
    public companyHasPersonRepository : CompanyHasPersonRepository,
  ) {}

  @post('/company-has-people')
  @response(200, {
    description: 'CompanyHasPerson model instance',
    content: {'application/json': {schema: getModelSchemaRef(CompanyHasPerson)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPerson, {
            title: 'NewCompanyHasPerson',
            exclude: ['id'],
          }),
        },
      },
    })
    companyHasPerson: Omit<CompanyHasPerson, 'id'>,
  ): Promise<CompanyHasPerson> {
    return this.companyHasPersonRepository.create(companyHasPerson);
  }

  @get('/company-has-people/count')
  @response(200, {
    description: 'CompanyHasPerson model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CompanyHasPerson) where?: Where<CompanyHasPerson>,
  ): Promise<Count> {
    return this.companyHasPersonRepository.count(where);
  }

  @get('/company-has-people')
  @response(200, {
    description: 'Array of CompanyHasPerson model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CompanyHasPerson, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CompanyHasPerson) filter?: Filter<CompanyHasPerson>,
  ): Promise<CompanyHasPerson[]> {
    return this.companyHasPersonRepository.find(filter);
  }

  @patch('/company-has-people')
  @response(200, {
    description: 'CompanyHasPerson PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPerson, {partial: true}),
        },
      },
    })
    companyHasPerson: CompanyHasPerson,
    @param.where(CompanyHasPerson) where?: Where<CompanyHasPerson>,
  ): Promise<Count> {
    return this.companyHasPersonRepository.updateAll(companyHasPerson, where);
  }

  @get('/company-has-people/{id}')
  @response(200, {
    description: 'CompanyHasPerson model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompanyHasPerson, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CompanyHasPerson, {exclude: 'where'}) filter?: FilterExcludingWhere<CompanyHasPerson>
  ): Promise<CompanyHasPerson> {
    return this.companyHasPersonRepository.findById(id, filter);
  }

  @patch('/company-has-people/{id}')
  @response(204, {
    description: 'CompanyHasPerson PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyHasPerson, {partial: true}),
        },
      },
    })
    companyHasPerson: CompanyHasPerson,
  ): Promise<void> {
    await this.companyHasPersonRepository.updateById(id, companyHasPerson);
  }

  @put('/company-has-people/{id}')
  @response(204, {
    description: 'CompanyHasPerson PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() companyHasPerson: CompanyHasPerson,
  ): Promise<void> {
    await this.companyHasPersonRepository.replaceById(id, companyHasPerson);
  }

  @del('/company-has-people/{id}')
  @response(204, {
    description: 'CompanyHasPerson DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyHasPersonRepository.deleteById(id);
  }
}
