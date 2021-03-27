import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CompanyHasCompanyActivity, CompanyHasCompanyActivityRelations} from '../models';

export class CompanyHasCompanyActivityRepository extends DefaultCrudRepository<
  CompanyHasCompanyActivity,
  typeof CompanyHasCompanyActivity.prototype.id,
  CompanyHasCompanyActivityRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CompanyHasCompanyActivity, dataSource);
  }
}
