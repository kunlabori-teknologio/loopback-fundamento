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
  ServicePayment, UserHasService
} from '../models';
import {UserHasServiceRepository} from '../repositories';

@authenticate('jwt')
export class UserHasServiceServicePaymentController {
  constructor(
    @repository(UserHasServiceRepository) protected userHasServiceRepository: UserHasServiceRepository,
  ) { }

  @get('/user-has-services/{id}/service-payment', {
    responses: {
      '200': {
        description: 'UserHasService has one ServicePayment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicePayment),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ServicePayment>,
  ): Promise<ServicePayment> {
    return this.userHasServiceRepository.servicePayment(id).get(filter);
  }

  @post('/user-has-services/{id}/service-payment', {
    responses: {
      '200': {
        description: 'UserHasService model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicePayment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserHasService.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePayment, {
            title: 'NewServicePaymentInUserHasService',
            exclude: ['id'],
            optional: ['userHasServiceId']
          }),
        },
      },
    }) servicePayment: Omit<ServicePayment, 'id'>,
  ): Promise<ServicePayment> {
    return this.userHasServiceRepository.servicePayment(id).create(servicePayment);
  }

  @patch('/user-has-services/{id}/service-payment', {
    responses: {
      '200': {
        description: 'UserHasService.ServicePayment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePayment, {partial: true}),
        },
      },
    })
    servicePayment: Partial<ServicePayment>,
    @param.query.object('where', getWhereSchemaFor(ServicePayment)) where?: Where<ServicePayment>,
  ): Promise<Count> {
    return this.userHasServiceRepository.servicePayment(id).patch(servicePayment, where);
  }

  @del('/user-has-services/{id}/service-payment', {
    responses: {
      '200': {
        description: 'UserHasService.ServicePayment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ServicePayment)) where?: Where<ServicePayment>,
  ): Promise<Count> {
    return this.userHasServiceRepository.servicePayment(id).delete(where);
  }
}
