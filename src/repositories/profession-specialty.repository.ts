import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProfessionSpecialty, ProfessionSpecialtyRelations, PersonHasProfessionSpecialty} from '../models';
import {PersonHasProfessionSpecialtyRepository} from './person-has-profession-specialty.repository';

export class ProfessionSpecialtyRepository extends DefaultCrudRepository<
  ProfessionSpecialty,
  typeof ProfessionSpecialty.prototype.id,
  ProfessionSpecialtyRelations
> {

  public readonly personHasProfessionSpecialties: HasManyRepositoryFactory<PersonHasProfessionSpecialty, typeof ProfessionSpecialty.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonHasProfessionSpecialtyRepository') protected personHasProfessionSpecialtyRepositoryGetter: Getter<PersonHasProfessionSpecialtyRepository>,
  ) {
    super(ProfessionSpecialty, dataSource);
    this.personHasProfessionSpecialties = this.createHasManyRepositoryFactoryFor('personHasProfessionSpecialties', personHasProfessionSpecialtyRepositoryGetter,);
    this.registerInclusionResolver('personHasProfessionSpecialties', this.personHasProfessionSpecialties.inclusionResolver);
  }
}
