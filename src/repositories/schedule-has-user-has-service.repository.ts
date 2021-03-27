import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ScheduleHasUserHasService, ScheduleHasUserHasServiceRelations, UserExtended} from '../models';
import {UserExtendedRepository} from './user-extended.repository';

export class ScheduleHasUserHasServiceRepository extends DefaultCrudRepository<
  ScheduleHasUserHasService,
  typeof ScheduleHasUserHasService.prototype.id,
  ScheduleHasUserHasServiceRelations
> {

  public readonly userExtendeds: HasManyRepositoryFactory<UserExtended, typeof ScheduleHasUserHasService.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserExtendedRepository') protected userExtendedRepositoryGetter: Getter<UserExtendedRepository>,
  ) {
    super(ScheduleHasUserHasService, dataSource);
    this.userExtendeds = this.createHasManyRepositoryFactoryFor('userExtendeds', userExtendedRepositoryGetter,);
    this.registerInclusionResolver('userExtendeds', this.userExtendeds.inclusionResolver);
  }
}
