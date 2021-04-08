import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CompanyHasPerson, CompanyHasPersonHasRole, Person, PersonHasProfessionSpecialty, PersonRelations} from '../models';
import {CompanyHasPersonHasRoleRepository} from './company-has-person-has-role.repository';
import {CompanyHasPersonRepository} from './company-has-person.repository';
import {PersonHasProfessionSpecialtyRepository} from './person-has-profession-specialty.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly personHasProfessionSpecialties: HasManyRepositoryFactory<PersonHasProfessionSpecialty, typeof Person.prototype.id>;

  public readonly companyHasPersonHasRoles: HasManyRepositoryFactory<CompanyHasPersonHasRole, typeof Person.prototype.id>;

  public readonly companyHasPeople: HasManyRepositoryFactory<CompanyHasPerson, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonHasProfessionSpecialtyRepository') protected personHasProfessionSpecialtyRepositoryGetter: Getter<PersonHasProfessionSpecialtyRepository>, @repository.getter('CompanyHasPersonHasRoleRepository') protected companyHasPersonHasRoleRepositoryGetter: Getter<CompanyHasPersonHasRoleRepository>, @repository.getter('CompanyHasPersonRepository') protected companyHasPersonRepositoryGetter: Getter<CompanyHasPersonRepository>,
  ) {
    super(Person, dataSource);
    this.companyHasPeople = this.createHasManyRepositoryFactoryFor('companyHasPeople', companyHasPersonRepositoryGetter,);
    this.registerInclusionResolver('companyHasPeople', this.companyHasPeople.inclusionResolver);
    this.companyHasPersonHasRoles = this.createHasManyRepositoryFactoryFor('companyHasPersonHasRoles', companyHasPersonHasRoleRepositoryGetter,);
    this.registerInclusionResolver('companyHasPersonHasRoles', this.companyHasPersonHasRoles.inclusionResolver);
    this.personHasProfessionSpecialties = this.createHasManyRepositoryFactoryFor('personHasProfessionSpecialties', personHasProfessionSpecialtyRepositoryGetter,);
    this.registerInclusionResolver('personHasProfessionSpecialties', this.personHasProfessionSpecialties.inclusionResolver);
  }
}
