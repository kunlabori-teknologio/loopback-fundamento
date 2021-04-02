import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Person, PersonRelations, PersonHasProfessionSpecialty, CompanyHasPersonHasRole, ScheduleHasUserHasService, CompanyHasPerson} from '../models';
import {PersonHasProfessionSpecialtyRepository} from './person-has-profession-specialty.repository';
import {CompanyHasPersonHasRoleRepository} from './company-has-person-has-role.repository';
import {ScheduleHasUserHasServiceRepository} from './schedule-has-user-has-service.repository';
import {CompanyHasPersonRepository} from './company-has-person.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly personHasProfessionSpecialties: HasManyRepositoryFactory<PersonHasProfessionSpecialty, typeof Person.prototype.id>;

  public readonly companyHasPersonHasRoles: HasManyRepositoryFactory<CompanyHasPersonHasRole, typeof Person.prototype.id>;

  public readonly scheduleHasUserHasServices: HasManyRepositoryFactory<ScheduleHasUserHasService, typeof Person.prototype.id>;

  public readonly companyHasPeople: HasManyRepositoryFactory<CompanyHasPerson, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonHasProfessionSpecialtyRepository') protected personHasProfessionSpecialtyRepositoryGetter: Getter<PersonHasProfessionSpecialtyRepository>, @repository.getter('CompanyHasPersonHasRoleRepository') protected companyHasPersonHasRoleRepositoryGetter: Getter<CompanyHasPersonHasRoleRepository>, @repository.getter('ScheduleHasUserHasServiceRepository') protected scheduleHasUserHasServiceRepositoryGetter: Getter<ScheduleHasUserHasServiceRepository>, @repository.getter('CompanyHasPersonRepository') protected companyHasPersonRepositoryGetter: Getter<CompanyHasPersonRepository>,
  ) {
    super(Person, dataSource);
    this.companyHasPeople = this.createHasManyRepositoryFactoryFor('companyHasPeople', companyHasPersonRepositoryGetter,);
    this.registerInclusionResolver('companyHasPeople', this.companyHasPeople.inclusionResolver);
    this.scheduleHasUserHasServices = this.createHasManyRepositoryFactoryFor('scheduleHasUserHasServices', scheduleHasUserHasServiceRepositoryGetter,);
    this.registerInclusionResolver('scheduleHasUserHasServices', this.scheduleHasUserHasServices.inclusionResolver);
    this.companyHasPersonHasRoles = this.createHasManyRepositoryFactoryFor('companyHasPersonHasRoles', companyHasPersonHasRoleRepositoryGetter,);
    this.registerInclusionResolver('companyHasPersonHasRoles', this.companyHasPersonHasRoles.inclusionResolver);
    this.personHasProfessionSpecialties = this.createHasManyRepositoryFactoryFor('personHasProfessionSpecialties', personHasProfessionSpecialtyRepositoryGetter,);
    this.registerInclusionResolver('personHasProfessionSpecialties', this.personHasProfessionSpecialties.inclusionResolver);
  }
}
