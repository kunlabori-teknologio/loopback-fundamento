import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UserHasService, UserHasServiceRelations, ServicePayment} from '../models';
import {ServicePaymentRepository} from './service-payment.repository';

export class UserHasServiceRepository extends DefaultCrudRepository<
  UserHasService,
  typeof UserHasService.prototype.id,
  UserHasServiceRelations
> {

  public readonly servicePayment: HasOneRepositoryFactory<ServicePayment, typeof UserHasService.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicePaymentRepository') protected servicePaymentRepositoryGetter: Getter<ServicePaymentRepository>,
  ) {
    super(UserHasService, dataSource);
    this.servicePayment = this.createHasOneRepositoryFactoryFor('servicePayment', servicePaymentRepositoryGetter);
    this.registerInclusionResolver('servicePayment', this.servicePayment.inclusionResolver);
  }
}
