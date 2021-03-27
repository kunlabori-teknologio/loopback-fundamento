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
  PaymentHasCreditCard
} from '../models';
import {PaymentRepository} from '../repositories';

@authenticate('jwt')
export class PaymentPaymentHasCreditCardController {
  constructor(
    @repository(PaymentRepository) protected paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/payment-has-credit-cards', {
    responses: {
      '200': {
        description: 'Array of Payment has many PaymentHasCreditCard',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentHasCreditCard)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PaymentHasCreditCard>,
  ): Promise<PaymentHasCreditCard[]> {
    return this.paymentRepository.paymentHasCreditCards(id).find(filter);
  }

  @post('/payments/{id}/payment-has-credit-cards', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentHasCreditCard)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Payment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasCreditCard, {
            title: 'NewPaymentHasCreditCardInPayment',
            exclude: ['id'],
            optional: ['paymentId']
          }),
        },
      },
    }) paymentHasCreditCard: Omit<PaymentHasCreditCard, 'id'>,
  ): Promise<PaymentHasCreditCard> {
    return this.paymentRepository.paymentHasCreditCards(id).create(paymentHasCreditCard);
  }

  @patch('/payments/{id}/payment-has-credit-cards', {
    responses: {
      '200': {
        description: 'Payment.PaymentHasCreditCard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasCreditCard, {partial: true}),
        },
      },
    })
    paymentHasCreditCard: Partial<PaymentHasCreditCard>,
    @param.query.object('where', getWhereSchemaFor(PaymentHasCreditCard)) where?: Where<PaymentHasCreditCard>,
  ): Promise<Count> {
    return this.paymentRepository.paymentHasCreditCards(id).patch(paymentHasCreditCard, where);
  }

  @del('/payments/{id}/payment-has-credit-cards', {
    responses: {
      '200': {
        description: 'Payment.PaymentHasCreditCard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PaymentHasCreditCard)) where?: Where<PaymentHasCreditCard>,
  ): Promise<Count> {
    return this.paymentRepository.paymentHasCreditCards(id).delete(where);
  }
}
