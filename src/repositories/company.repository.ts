import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Company, CompanyRelations, CompanyHasPerson, CompanyHasCompanyActivity, CompanyHasPersonHasRole} from '../models';
import {CompanyHasPersonRepository} from './company-has-person.repository';
import {CompanyHasCompanyActivityRepository} from './company-has-company-activity.repository';
import {CompanyHasPersonHasRoleRepository} from './company-has-person-has-role.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {

  public readonly companyHasPeople: HasManyRepositoryFactory<CompanyHasPerson, typeof Company.prototype.id>;

  public readonly companyHasCompanyActivities: HasManyRepositoryFactory<CompanyHasCompanyActivity, typeof Company.prototype.id>;

  public readonly companyHasPersonHasRoles: HasManyRepositoryFactory<CompanyHasPersonHasRole, typeof Company.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompanyHasPersonRepository') protected companyHasPersonRepositoryGetter: Getter<CompanyHasPersonRepository>, @repository.getter('CompanyHasCompanyActivityRepository') protected companyHasCompanyActivityRepositoryGetter: Getter<CompanyHasCompanyActivityRepository>, @repository.getter('CompanyHasPersonHasRoleRepository') protected companyHasPersonHasRoleRepositoryGetter: Getter<CompanyHasPersonHasRoleRepository>,
  ) {
    super(Company, dataSource);
    this.companyHasPersonHasRoles = this.createHasManyRepositoryFactoryFor('companyHasPersonHasRoles', companyHasPersonHasRoleRepositoryGetter,);
    this.registerInclusionResolver('companyHasPersonHasRoles', this.companyHasPersonHasRoles.inclusionResolver);
    this.companyHasCompanyActivities = this.createHasManyRepositoryFactoryFor('companyHasCompanyActivities', companyHasCompanyActivityRepositoryGetter,);
    this.registerInclusionResolver('companyHasCompanyActivities', this.companyHasCompanyActivities.inclusionResolver);
    this.companyHasPeople = this.createHasManyRepositoryFactoryFor('companyHasPeople', companyHasPersonRepositoryGetter,);
    this.registerInclusionResolver('companyHasPeople', this.companyHasPeople.inclusionResolver);
  }
}
