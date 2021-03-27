import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Role, RoleRelations, CompanyHasPersonHasRole} from '../models';
import {CompanyHasPersonHasRoleRepository} from './company-has-person-has-role.repository';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id,
  RoleRelations
> {

  public readonly companyHasPersonHasRoles: HasManyRepositoryFactory<CompanyHasPersonHasRole, typeof Role.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompanyHasPersonHasRoleRepository') protected companyHasPersonHasRoleRepositoryGetter: Getter<CompanyHasPersonHasRoleRepository>,
  ) {
    super(Role, dataSource);
    this.companyHasPersonHasRoles = this.createHasManyRepositoryFactoryFor('companyHasPersonHasRoles', companyHasPersonHasRoleRepositoryGetter,);
    this.registerInclusionResolver('companyHasPersonHasRoles', this.companyHasPersonHasRoles.inclusionResolver);
  }
}
