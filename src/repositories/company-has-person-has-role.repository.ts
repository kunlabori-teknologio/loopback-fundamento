import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CompanyHasPersonHasRole, CompanyHasPersonHasRoleRelations} from '../models';

export class CompanyHasPersonHasRoleRepository extends DefaultCrudRepository<
  CompanyHasPersonHasRole,
  typeof CompanyHasPersonHasRole.prototype.id,
  CompanyHasPersonHasRoleRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CompanyHasPersonHasRole, dataSource);
  }
}
