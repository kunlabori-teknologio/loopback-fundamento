import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PersonHasProfessionSpecialty, PersonHasProfessionSpecialtyRelations} from '../models';

export class PersonHasProfessionSpecialtyRepository extends DefaultCrudRepository<
  PersonHasProfessionSpecialty,
  typeof PersonHasProfessionSpecialty.prototype.id,
  PersonHasProfessionSpecialtyRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PersonHasProfessionSpecialty, dataSource);
  }
}
