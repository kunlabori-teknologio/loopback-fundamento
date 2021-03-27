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
import {PaymentHasCreditCard} from '../models';
import {PaymentHasCreditCardRepository} from '../repositories';

@authenticate('jwt')
export class PaymentHasCreditCardController {
  constructor(
    @repository(PaymentHasCreditCardRepository)
    public paymentHasCreditCardRepository : PaymentHasCreditCardRepository,
  ) {}

  @post('/payment-has-credit-cards')
  @response(200, {
    description: 'PaymentHasCreditCard model instance',
    content: {'application/json': {schema: getModelSchemaRef(PaymentHasCreditCard)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasCreditCard, {
            title: 'NewPaymentHasCreditCard',
            exclude: ['id'],
          }),
        },
      },
    })
    paymentHasCreditCard: Omit<PaymentHasCreditCard, 'id'>,
  ): Promise<PaymentHasCreditCard> {
    return this.paymentHasCreditCardRepository.create(paymentHasCreditCard);
  }

  @get('/payment-has-credit-cards/count')
  @response(200, {
    description: 'PaymentHasCreditCard model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PaymentHasCreditCard) where?: Where<PaymentHasCreditCard>,
  ): Promise<Count> {
    return this.paymentHasCreditCardRepository.count(where);
  }

  @get('/payment-has-credit-cards')
  @response(200, {
    description: 'Array of PaymentHasCreditCard model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaymentHasCreditCard, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PaymentHasCreditCard) filter?: Filter<PaymentHasCreditCard>,
  ): Promise<PaymentHasCreditCard[]> {
    return this.paymentHasCreditCardRepository.find(filter);
  }

  @patch('/payment-has-credit-cards')
  @response(200, {
    description: 'PaymentHasCreditCard PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasCreditCard, {partial: true}),
        },
      },
    })
    paymentHasCreditCard: PaymentHasCreditCard,
    @param.where(PaymentHasCreditCard) where?: Where<PaymentHasCreditCard>,
  ): Promise<Count> {
    return this.paymentHasCreditCardRepository.updateAll(paymentHasCreditCard, where);
  }

  @get('/payment-has-credit-cards/{id}')
  @response(200, {
    description: 'PaymentHasCreditCard model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PaymentHasCreditCard, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PaymentHasCreditCard, {exclude: 'where'}) filter?: FilterExcludingWhere<PaymentHasCreditCard>
  ): Promise<PaymentHasCreditCard> {
    return this.paymentHasCreditCardRepository.findById(id, filter);
  }

  @patch('/payment-has-credit-cards/{id}')
  @response(204, {
    description: 'PaymentHasCreditCard PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasCreditCard, {partial: true}),
        },
      },
    })
    paymentHasCreditCard: PaymentHasCreditCard,
  ): Promise<void> {
    await this.paymentHasCreditCardRepository.updateById(id, paymentHasCreditCard);
  }

  @put('/payment-has-credit-cards/{id}')
  @response(204, {
    description: 'PaymentHasCreditCard PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() paymentHasCreditCard: PaymentHasCreditCard,
  ): Promise<void> {
    await this.paymentHasCreditCardRepository.replaceById(id, paymentHasCreditCard);
  }

  @del('/payment-has-credit-cards/{id}')
  @response(204, {
    description: 'PaymentHasCreditCard DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paymentHasCreditCardRepository.deleteById(id);
  }
}
