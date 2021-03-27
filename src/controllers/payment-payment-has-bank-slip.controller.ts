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
  PaymentHasBankSlip
} from '../models';
import {PaymentRepository} from '../repositories';

@authenticate('jwt')
export class PaymentPaymentHasBankSlipController {
  constructor(
    @repository(PaymentRepository) protected paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/payment-has-bank-slips', {
    responses: {
      '200': {
        description: 'Array of Payment has many PaymentHasBankSlip',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentHasBankSlip)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PaymentHasBankSlip>,
  ): Promise<PaymentHasBankSlip[]> {
    return this.paymentRepository.paymentHasBankSlips(id).find(filter);
  }

  @post('/payments/{id}/payment-has-bank-slips', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentHasBankSlip)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Payment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasBankSlip, {
            title: 'NewPaymentHasBankSlipInPayment',
            exclude: ['id'],
            optional: ['paymentId']
          }),
        },
      },
    }) paymentHasBankSlip: Omit<PaymentHasBankSlip, 'id'>,
  ): Promise<PaymentHasBankSlip> {
    return this.paymentRepository.paymentHasBankSlips(id).create(paymentHasBankSlip);
  }

  @patch('/payments/{id}/payment-has-bank-slips', {
    responses: {
      '200': {
        description: 'Payment.PaymentHasBankSlip PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasBankSlip, {partial: true}),
        },
      },
    })
    paymentHasBankSlip: Partial<PaymentHasBankSlip>,
    @param.query.object('where', getWhereSchemaFor(PaymentHasBankSlip)) where?: Where<PaymentHasBankSlip>,
  ): Promise<Count> {
    return this.paymentRepository.paymentHasBankSlips(id).patch(paymentHasBankSlip, where);
  }

  @del('/payments/{id}/payment-has-bank-slips', {
    responses: {
      '200': {
        description: 'Payment.PaymentHasBankSlip DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PaymentHasBankSlip)) where?: Where<PaymentHasBankSlip>,
  ): Promise<Count> {
    return this.paymentRepository.paymentHasBankSlips(id).delete(where);
  }
}
