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
import {BankSlip} from '../models';
import {BankSlipRepository} from '../repositories';

@authenticate('jwt')
export class BankSlipController {
  constructor(
    @repository(BankSlipRepository)
    public bankSlipRepository : BankSlipRepository,
  ) {}

  @post('/bank-slips')
  @response(200, {
    description: 'BankSlip model instance',
    content: {'application/json': {schema: getModelSchemaRef(BankSlip)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankSlip, {
            title: 'NewBankSlip',
            exclude: ['id'],
          }),
        },
      },
    })
    bankSlip: Omit<BankSlip, 'id'>,
  ): Promise<BankSlip> {
    return this.bankSlipRepository.create(bankSlip);
  }

  @get('/bank-slips/count')
  @response(200, {
    description: 'BankSlip model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BankSlip) where?: Where<BankSlip>,
  ): Promise<Count> {
    return this.bankSlipRepository.count(where);
  }

  @get('/bank-slips')
  @response(200, {
    description: 'Array of BankSlip model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BankSlip, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BankSlip) filter?: Filter<BankSlip>,
  ): Promise<BankSlip[]> {
    return this.bankSlipRepository.find(filter);
  }

  @patch('/bank-slips')
  @response(200, {
    description: 'BankSlip PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankSlip, {partial: true}),
        },
      },
    })
    bankSlip: BankSlip,
    @param.where(BankSlip) where?: Where<BankSlip>,
  ): Promise<Count> {
    return this.bankSlipRepository.updateAll(bankSlip, where);
  }

  @get('/bank-slips/{id}')
  @response(200, {
    description: 'BankSlip model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BankSlip, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BankSlip, {exclude: 'where'}) filter?: FilterExcludingWhere<BankSlip>
  ): Promise<BankSlip> {
    return this.bankSlipRepository.findById(id, filter);
  }

  @patch('/bank-slips/{id}')
  @response(204, {
    description: 'BankSlip PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankSlip, {partial: true}),
        },
      },
    })
    bankSlip: BankSlip,
  ): Promise<void> {
    await this.bankSlipRepository.updateById(id, bankSlip);
  }

  @put('/bank-slips/{id}')
  @response(204, {
    description: 'BankSlip PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bankSlip: BankSlip,
  ): Promise<void> {
    await this.bankSlipRepository.replaceById(id, bankSlip);
  }

  @del('/bank-slips/{id}')
  @response(204, {
    description: 'BankSlip DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bankSlipRepository.deleteById(id);
  }
}
