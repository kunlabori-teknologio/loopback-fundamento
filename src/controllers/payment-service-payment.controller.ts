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
  Payment,
  ServicePayment
} from '../models';
import {PaymentRepository} from '../repositories';

@authenticate('jwt')
export class PaymentServicePaymentController {
  constructor(
    @repository(PaymentRepository) protected paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/service-payment', {
    responses: {
      '200': {
        description: 'Payment has one ServicePayment',
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
    return this.paymentRepository.servicePayment(id).get(filter);
  }

  @post('/payments/{id}/service-payment', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicePayment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Payment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePayment, {
            title: 'NewServicePaymentInPayment',
            exclude: ['id'],
            optional: ['paymentId']
          }),
        },
      },
    }) servicePayment: Omit<ServicePayment, 'id'>,
  ): Promise<ServicePayment> {
    return this.paymentRepository.servicePayment(id).create(servicePayment);
  }

  @patch('/payments/{id}/service-payment', {
    responses: {
      '200': {
        description: 'Payment.ServicePayment PATCH success count',
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
    return this.paymentRepository.servicePayment(id).patch(servicePayment, where);
  }

  @del('/payments/{id}/service-payment', {
    responses: {
      '200': {
        description: 'Payment.ServicePayment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ServicePayment)) where?: Where<ServicePayment>,
  ): Promise<Count> {
    return this.paymentRepository.servicePayment(id).delete(where);
  }
}
