import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Profession, ProfessionRelations, ProfessionSpecialty} from '../models';
import {ProfessionSpecialtyRepository} from './profession-specialty.repository';

export class ProfessionRepository extends DefaultCrudRepository<
  Profession,
  typeof Profession.prototype.id,
  ProfessionRelations
> {

  public readonly professionSpecialties: HasManyRepositoryFactory<ProfessionSpecialty, typeof Profession.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProfessionSpecialtyRepository') protected professionSpecialtyRepositoryGetter: Getter<ProfessionSpecialtyRepository>,
  ) {
    super(Profession, dataSource);
    this.professionSpecialties = this.createHasManyRepositoryFactoryFor('professionSpecialties', professionSpecialtyRepositoryGetter,);
    this.registerInclusionResolver('professionSpecialties', this.professionSpecialties.inclusionResolver);
  }
}
