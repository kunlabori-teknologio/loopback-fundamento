import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {BankSlip, BankSlipRelations, PaymentHasBankSlip} from '../models';
import {PaymentHasBankSlipRepository} from './payment-has-bank-slip.repository';

export class BankSlipRepository extends DefaultCrudRepository<
  BankSlip,
  typeof BankSlip.prototype.id,
  BankSlipRelations
> {

  public readonly paymentHasBankSlips: HasManyRepositoryFactory<PaymentHasBankSlip, typeof BankSlip.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PaymentHasBankSlipRepository') protected paymentHasBankSlipRepositoryGetter: Getter<PaymentHasBankSlipRepository>,
  ) {
    super(BankSlip, dataSource);
    this.paymentHasBankSlips = this.createHasManyRepositoryFactoryFor('paymentHasBankSlips', paymentHasBankSlipRepositoryGetter,);
    this.registerInclusionResolver('paymentHasBankSlips', this.paymentHasBankSlips.inclusionResolver);
  }
}
