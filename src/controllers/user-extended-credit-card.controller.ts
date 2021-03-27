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
  CreditCard, UserExtended
} from '../models';
import {UserExtendedRepository} from '../repositories';

@authenticate('jwt')
export class UserExtendedCreditCardController {
  constructor(
    @repository(UserExtendedRepository) protected userExtendedRepository: UserExtendedRepository,
  ) { }

  @get('/user-extendeds/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'Array of UserExtended has many CreditCard',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CreditCard)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CreditCard>,
  ): Promise<CreditCard[]> {
    return this.userExtendedRepository.creditCards(id).find(filter);
  }

  @post('/user-extendeds/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'UserExtended model instance',
        content: {'application/json': {schema: getModelSchemaRef(CreditCard)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserExtended.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditCard, {
            title: 'NewCreditCardInUserExtended',
            exclude: ['id'],
            optional: ['userExtendedId']
          }),
        },
      },
    }) creditCard: Omit<CreditCard, 'id'>,
  ): Promise<CreditCard> {
    return this.userExtendedRepository.creditCards(id).create(creditCard);
  }

  @patch('/user-extendeds/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'UserExtended.CreditCard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditCard, {partial: true}),
        },
      },
    })
    creditCard: Partial<CreditCard>,
    @param.query.object('where', getWhereSchemaFor(CreditCard)) where?: Where<CreditCard>,
  ): Promise<Count> {
    return this.userExtendedRepository.creditCards(id).patch(creditCard, where);
  }

  @del('/user-extendeds/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'UserExtended.CreditCard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CreditCard)) where?: Where<CreditCard>,
  ): Promise<Count> {
    return this.userExtendedRepository.creditCards(id).delete(where);
  }
}
