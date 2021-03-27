import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PaymentHasBankSlip, PaymentHasBankSlipRelations} from '../models';

export class PaymentHasBankSlipRepository extends DefaultCrudRepository<
  PaymentHasBankSlip,
  typeof PaymentHasBankSlip.prototype.id,
  PaymentHasBankSlipRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PaymentHasBankSlip, dataSource);
  }
}
