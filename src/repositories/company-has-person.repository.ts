import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CompanyHasPerson, CompanyHasPersonRelations, Person} from '../models';
import {PersonRepository} from './person.repository';

export class CompanyHasPersonRepository extends DefaultCrudRepository<
  CompanyHasPerson,
  typeof CompanyHasPerson.prototype.id,
  CompanyHasPersonRelations
> {

  public readonly people: HasManyRepositoryFactory<Person, typeof CompanyHasPerson.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(CompanyHasPerson, dataSource);
    this.people = this.createHasManyRepositoryFactoryFor('people', personRepositoryGetter,);
    this.registerInclusionResolver('people', this.people.inclusionResolver);
  }
}
