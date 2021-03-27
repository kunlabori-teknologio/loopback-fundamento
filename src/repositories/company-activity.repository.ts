import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CompanyActivity, CompanyActivityRelations, CompanyHasCompanyActivity} from '../models';
import {CompanyHasCompanyActivityRepository} from './company-has-company-activity.repository';

export class CompanyActivityRepository extends DefaultCrudRepository<
  CompanyActivity,
  typeof CompanyActivity.prototype.id,
  CompanyActivityRelations
> {

  public readonly companyHasCompanyActivities: HasManyRepositoryFactory<CompanyHasCompanyActivity, typeof CompanyActivity.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompanyHasCompanyActivityRepository') protected companyHasCompanyActivityRepositoryGetter: Getter<CompanyHasCompanyActivityRepository>,
  ) {
    super(CompanyActivity, dataSource);
    this.companyHasCompanyActivities = this.createHasManyRepositoryFactoryFor('companyHasCompanyActivities', companyHasCompanyActivityRepositoryGetter,);
    this.registerInclusionResolver('companyHasCompanyActivities', this.companyHasCompanyActivities.inclusionResolver);
  }
}
