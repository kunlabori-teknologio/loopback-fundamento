import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ServicePayment, ServicePaymentRelations} from '../models';

export class ServicePaymentRepository extends DefaultCrudRepository<
  ServicePayment,
  typeof ServicePayment.prototype.id,
  ServicePaymentRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ServicePayment, dataSource);
  }
}
