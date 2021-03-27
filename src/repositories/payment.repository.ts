import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Payment, PaymentRelations, PaymentHasCreditCard, PaymentHasBankSlip, ServicePayment} from '../models';
import {PaymentHasCreditCardRepository} from './payment-has-credit-card.repository';
import {PaymentHasBankSlipRepository} from './payment-has-bank-slip.repository';
import {ServicePaymentRepository} from './service-payment.repository';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.id,
  PaymentRelations
> {

  public readonly paymentHasCreditCards: HasManyRepositoryFactory<PaymentHasCreditCard, typeof Payment.prototype.id>;

  public readonly paymentHasBankSlips: HasManyRepositoryFactory<PaymentHasBankSlip, typeof Payment.prototype.id>;

  public readonly servicePayment: HasOneRepositoryFactory<ServicePayment, typeof Payment.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PaymentHasCreditCardRepository') protected paymentHasCreditCardRepositoryGetter: Getter<PaymentHasCreditCardRepository>, @repository.getter('PaymentHasBankSlipRepository') protected paymentHasBankSlipRepositoryGetter: Getter<PaymentHasBankSlipRepository>, @repository.getter('ServicePaymentRepository') protected servicePaymentRepositoryGetter: Getter<ServicePaymentRepository>,
  ) {
    super(Payment, dataSource);
    this.servicePayment = this.createHasOneRepositoryFactoryFor('servicePayment', servicePaymentRepositoryGetter);
    this.registerInclusionResolver('servicePayment', this.servicePayment.inclusionResolver);
    this.paymentHasBankSlips = this.createHasManyRepositoryFactoryFor('paymentHasBankSlips', paymentHasBankSlipRepositoryGetter,);
    this.registerInclusionResolver('paymentHasBankSlips', this.paymentHasBankSlips.inclusionResolver);
    this.paymentHasCreditCards = this.createHasManyRepositoryFactoryFor('paymentHasCreditCards', paymentHasCreditCardRepositoryGetter,);
    this.registerInclusionResolver('paymentHasCreditCards', this.paymentHasCreditCards.inclusionResolver);
  }
}
