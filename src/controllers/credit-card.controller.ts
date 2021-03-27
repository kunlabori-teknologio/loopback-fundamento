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
import {CreditCard} from '../models';
import {CreditCardRepository} from '../repositories';

@authenticate('jwt')
export class CreditCardController {
  constructor(
    @repository(CreditCardRepository)
    public creditCardRepository : CreditCardRepository,
  ) {}

  @post('/credit-cards')
  @response(200, {
    description: 'CreditCard model instance',
    content: {'application/json': {schema: getModelSchemaRef(CreditCard)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditCard, {
            title: 'NewCreditCard',
            exclude: ['id'],
          }),
        },
      },
    })
    creditCard: Omit<CreditCard, 'id'>,
  ): Promise<CreditCard> {
    return this.creditCardRepository.create(creditCard);
  }

  @get('/credit-cards/count')
  @response(200, {
    description: 'CreditCard model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CreditCard) where?: Where<CreditCard>,
  ): Promise<Count> {
    return this.creditCardRepository.count(where);
  }

  @get('/credit-cards')
  @response(200, {
    description: 'Array of CreditCard model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CreditCard, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CreditCard) filter?: Filter<CreditCard>,
  ): Promise<CreditCard[]> {
    return this.creditCardRepository.find(filter);
  }

  @patch('/credit-cards')
  @response(200, {
    description: 'CreditCard PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditCard, {partial: true}),
        },
      },
    })
    creditCard: CreditCard,
    @param.where(CreditCard) where?: Where<CreditCard>,
  ): Promise<Count> {
    return this.creditCardRepository.updateAll(creditCard, where);
  }

  @get('/credit-cards/{id}')
  @response(200, {
    description: 'CreditCard model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CreditCard, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CreditCard, {exclude: 'where'}) filter?: FilterExcludingWhere<CreditCard>
  ): Promise<CreditCard> {
    return this.creditCardRepository.findById(id, filter);
  }

  @patch('/credit-cards/{id}')
  @response(204, {
    description: 'CreditCard PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditCard, {partial: true}),
        },
      },
    })
    creditCard: CreditCard,
  ): Promise<void> {
    await this.creditCardRepository.updateById(id, creditCard);
  }

  @put('/credit-cards/{id}')
  @response(204, {
    description: 'CreditCard PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() creditCard: CreditCard,
  ): Promise<void> {
    await this.creditCardRepository.replaceById(id, creditCard);
  }

  @del('/credit-cards/{id}')
  @response(204, {
    description: 'CreditCard DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.creditCardRepository.deleteById(id);
  }
}
