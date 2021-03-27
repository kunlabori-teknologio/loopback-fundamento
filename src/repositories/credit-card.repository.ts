import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CreditCard, CreditCardRelations, PaymentHasCreditCard} from '../models';
import {PaymentHasCreditCardRepository} from './payment-has-credit-card.repository';

export class CreditCardRepository extends DefaultCrudRepository<
  CreditCard,
  typeof CreditCard.prototype.id,
  CreditCardRelations
> {

  public readonly paymentHasCreditCards: HasManyRepositoryFactory<PaymentHasCreditCard, typeof CreditCard.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PaymentHasCreditCardRepository') protected paymentHasCreditCardRepositoryGetter: Getter<PaymentHasCreditCardRepository>,
  ) {
    super(CreditCard, dataSource);
    this.paymentHasCreditCards = this.createHasManyRepositoryFactoryFor('paymentHasCreditCards', paymentHasCreditCardRepositoryGetter,);
    this.registerInclusionResolver('paymentHasCreditCards', this.paymentHasCreditCards.inclusionResolver);
  }
}
