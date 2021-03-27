import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PaymentHasCreditCard, PaymentHasCreditCardRelations} from '../models';

export class PaymentHasCreditCardRepository extends DefaultCrudRepository<
  PaymentHasCreditCard,
  typeof PaymentHasCreditCard.prototype.id,
  PaymentHasCreditCardRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PaymentHasCreditCard, dataSource);
  }
}
