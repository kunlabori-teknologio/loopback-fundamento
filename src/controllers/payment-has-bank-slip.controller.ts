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
import {PaymentHasBankSlip} from '../models';
import {PaymentHasBankSlipRepository} from '../repositories';

@authenticate('jwt')
export class PaymentHasBankSlipController {
  constructor(
    @repository(PaymentHasBankSlipRepository)
    public paymentHasBankSlipRepository : PaymentHasBankSlipRepository,
  ) {}

  @post('/payment-has-bank-slips')
  @response(200, {
    description: 'PaymentHasBankSlip model instance',
    content: {'application/json': {schema: getModelSchemaRef(PaymentHasBankSlip)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasBankSlip, {
            title: 'NewPaymentHasBankSlip',
            exclude: ['id'],
          }),
        },
      },
    })
    paymentHasBankSlip: Omit<PaymentHasBankSlip, 'id'>,
  ): Promise<PaymentHasBankSlip> {
    return this.paymentHasBankSlipRepository.create(paymentHasBankSlip);
  }

  @get('/payment-has-bank-slips/count')
  @response(200, {
    description: 'PaymentHasBankSlip model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PaymentHasBankSlip) where?: Where<PaymentHasBankSlip>,
  ): Promise<Count> {
    return this.paymentHasBankSlipRepository.count(where);
  }

  @get('/payment-has-bank-slips')
  @response(200, {
    description: 'Array of PaymentHasBankSlip model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaymentHasBankSlip, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PaymentHasBankSlip) filter?: Filter<PaymentHasBankSlip>,
  ): Promise<PaymentHasBankSlip[]> {
    return this.paymentHasBankSlipRepository.find(filter);
  }

  @patch('/payment-has-bank-slips')
  @response(200, {
    description: 'PaymentHasBankSlip PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasBankSlip, {partial: true}),
        },
      },
    })
    paymentHasBankSlip: PaymentHasBankSlip,
    @param.where(PaymentHasBankSlip) where?: Where<PaymentHasBankSlip>,
  ): Promise<Count> {
    return this.paymentHasBankSlipRepository.updateAll(paymentHasBankSlip, where);
  }

  @get('/payment-has-bank-slips/{id}')
  @response(200, {
    description: 'PaymentHasBankSlip model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PaymentHasBankSlip, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PaymentHasBankSlip, {exclude: 'where'}) filter?: FilterExcludingWhere<PaymentHasBankSlip>
  ): Promise<PaymentHasBankSlip> {
    return this.paymentHasBankSlipRepository.findById(id, filter);
  }

  @patch('/payment-has-bank-slips/{id}')
  @response(204, {
    description: 'PaymentHasBankSlip PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentHasBankSlip, {partial: true}),
        },
      },
    })
    paymentHasBankSlip: PaymentHasBankSlip,
  ): Promise<void> {
    await this.paymentHasBankSlipRepository.updateById(id, paymentHasBankSlip);
  }

  @put('/payment-has-bank-slips/{id}')
  @response(204, {
    description: 'PaymentHasBankSlip PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() paymentHasBankSlip: PaymentHasBankSlip,
  ): Promise<void> {
    await this.paymentHasBankSlipRepository.replaceById(id, paymentHasBankSlip);
  }

  @del('/payment-has-bank-slips/{id}')
  @response(204, {
    description: 'PaymentHasBankSlip DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paymentHasBankSlipRepository.deleteById(id);
  }
}
