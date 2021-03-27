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
  BankSlip,
  PaymentHasBankSlip
} from '../models';
import {BankSlipRepository} from '../repositories';

@authenticate('jwt')
export class BankSlipPaymentHasBankSlipController {
  constructor(
    @repository(BankSlipRepository) protected bankSlipRepository: BankSlipRepository,
  ) { }

  @get('/bank-slips/{id}/payment-has-bank-slips', {
    responses: {
      '200': {
        description: 'Array of BankSlip has many PaymentHasBankSlip',
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
    return this.bankSlipRepository.paymentHasBankSlips(id).find(filter);
  }

  @post('/bank-slips/{id}/payment-has-bank-slips', {
    responses: {
      '200': {
        description: 'BankSlip model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentHasBankSlip)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof BankSlip.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasBankSlip, {
            title: 'NewPaymentHasBankSlipInBankSlip',
            exclude: ['id'],
            optional: ['bankSlipId']
          }),
        },
      },
    }) paymentHasBankSlip: Omit<PaymentHasBankSlip, 'id'>,
  ): Promise<PaymentHasBankSlip> {
    return this.bankSlipRepository.paymentHasBankSlips(id).create(paymentHasBankSlip);
  }

  @patch('/bank-slips/{id}/payment-has-bank-slips', {
    responses: {
      '200': {
        description: 'BankSlip.PaymentHasBankSlip PATCH success count',
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
    return this.bankSlipRepository.paymentHasBankSlips(id).patch(paymentHasBankSlip, where);
  }

  @del('/bank-slips/{id}/payment-has-bank-slips', {
    responses: {
      '200': {
        description: 'BankSlip.PaymentHasBankSlip DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PaymentHasBankSlip)) where?: Where<PaymentHasBankSlip>,
  ): Promise<Count> {
    return this.bankSlipRepository.paymentHasBankSlips(id).delete(where);
  }
}
