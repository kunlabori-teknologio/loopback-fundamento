import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CompanyHasPerson, CompanyHasPersonRelations} from '../models';

export class CompanyHasPersonRepository extends DefaultCrudRepository<
  CompanyHasPerson,
  typeof CompanyHasPerson.prototype.id,
  CompanyHasPersonRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CompanyHasPerson, dataSource);
  }
}
