import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Schedule, ScheduleRelations, ScheduleParticipant, ScheduleHasUserHasService} from '../models';
import {ScheduleParticipantRepository} from './schedule-participant.repository';
import {ScheduleHasUserHasServiceRepository} from './schedule-has-user-has-service.repository';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.id,
  ScheduleRelations
> {

  public readonly scheduleParticipants: HasManyRepositoryFactory<ScheduleParticipant, typeof Schedule.prototype.id>;

  public readonly scheduleHasUserHasServices: HasManyRepositoryFactory<ScheduleHasUserHasService, typeof Schedule.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ScheduleParticipantRepository') protected scheduleParticipantRepositoryGetter: Getter<ScheduleParticipantRepository>, @repository.getter('ScheduleHasUserHasServiceRepository') protected scheduleHasUserHasServiceRepositoryGetter: Getter<ScheduleHasUserHasServiceRepository>,
  ) {
    super(Schedule, dataSource);
    this.scheduleHasUserHasServices = this.createHasManyRepositoryFactoryFor('scheduleHasUserHasServices', scheduleHasUserHasServiceRepositoryGetter,);
    this.registerInclusionResolver('scheduleHasUserHasServices', this.scheduleHasUserHasServices.inclusionResolver);
    this.scheduleParticipants = this.createHasManyRepositoryFactoryFor('scheduleParticipants', scheduleParticipantRepositoryGetter,);
    this.registerInclusionResolver('scheduleParticipants', this.scheduleParticipants.inclusionResolver);
  }
}
