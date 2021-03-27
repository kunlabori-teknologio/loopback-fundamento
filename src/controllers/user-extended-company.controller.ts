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
  Company, UserExtended
} from '../models';
import {UserExtendedRepository} from '../repositories';

@authenticate('jwt')
export class UserExtendedCompanyController {
  constructor(
    @repository(UserExtendedRepository) protected userExtendedRepository: UserExtendedRepository,
  ) { }

  @get('/user-extendeds/{id}/company', {
    responses: {
      '200': {
        description: 'UserExtended has one Company',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Company),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Company>,
  ): Promise<Company> {
    return this.userExtendedRepository.company(id).get(filter);
  }

  @post('/user-extendeds/{id}/company', {
    responses: {
      '200': {
        description: 'UserExtended model instance',
        content: {'application/json': {schema: getModelSchemaRef(Company)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserExtended.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompanyInUserExtended',
            exclude: ['id'],
            optional: ['userExtendedId']
          }),
        },
      },
    }) company: Omit<Company, 'id'>,
  ): Promise<Company> {
    return this.userExtendedRepository.company(id).create(company);
  }

  @patch('/user-extendeds/{id}/company', {
    responses: {
      '200': {
        description: 'UserExtended.Company PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Partial<Company>,
    @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
  ): Promise<Count> {
    return this.userExtendedRepository.company(id).patch(company, where);
  }

  @del('/user-extendeds/{id}/company', {
    responses: {
      '200': {
        description: 'UserExtended.Company DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
  ): Promise<Count> {
    return this.userExtendedRepository.company(id).delete(where);
  }
}
