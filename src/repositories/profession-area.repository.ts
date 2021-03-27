import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProfessionArea, ProfessionAreaRelations, Profession} from '../models';
import {ProfessionRepository} from './profession.repository';

export class ProfessionAreaRepository extends DefaultCrudRepository<
  ProfessionArea,
  typeof ProfessionArea.prototype.id,
  ProfessionAreaRelations
> {

  public readonly professions: HasManyRepositoryFactory<Profession, typeof ProfessionArea.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProfessionRepository') protected professionRepositoryGetter: Getter<ProfessionRepository>,
  ) {
    super(ProfessionArea, dataSource);
    this.professions = this.createHasManyRepositoryFactoryFor('professions', professionRepositoryGetter,);
  }
}
