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
  CreditCard,
  PaymentHasCreditCard
} from '../models';
import {CreditCardRepository} from '../repositories';

@authenticate('jwt')
export class CreditCardPaymentHasCreditCardController {
  constructor(
    @repository(CreditCardRepository) protected creditCardRepository: CreditCardRepository,
  ) { }

  @get('/credit-cards/{id}/payment-has-credit-cards', {
    responses: {
      '200': {
        description: 'Array of CreditCard has many PaymentHasCreditCard',
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
    return this.creditCardRepository.paymentHasCreditCards(id).find(filter);
  }

  @post('/credit-cards/{id}/payment-has-credit-cards', {
    responses: {
      '200': {
        description: 'CreditCard model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentHasCreditCard)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CreditCard.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasCreditCard, {
            title: 'NewPaymentHasCreditCardInCreditCard',
            exclude: ['id'],
            optional: ['creditCardId']
          }),
        },
      },
    }) paymentHasCreditCard: Omit<PaymentHasCreditCard, 'id'>,
  ): Promise<PaymentHasCreditCard> {
    return this.creditCardRepository.paymentHasCreditCards(id).create(paymentHasCreditCard);
  }

  @patch('/credit-cards/{id}/payment-has-credit-cards', {
    responses: {
      '200': {
        description: 'CreditCard.PaymentHasCreditCard PATCH success count',
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
    return this.creditCardRepository.paymentHasCreditCards(id).patch(paymentHasCreditCard, where);
  }

  @del('/credit-cards/{id}/payment-has-credit-cards', {
    responses: {
      '200': {
        description: 'CreditCard.PaymentHasCreditCard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PaymentHasCreditCard)) where?: Where<PaymentHasCreditCard>,
  ): Promise<Count> {
    return this.creditCardRepository.paymentHasCreditCards(id).delete(where);
  }
}
