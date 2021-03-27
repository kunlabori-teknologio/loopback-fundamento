import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ScheduleParticipant, ScheduleParticipantRelations} from '../models';

export class ScheduleParticipantRepository extends DefaultCrudRepository<
  ScheduleParticipant,
  typeof ScheduleParticipant.prototype.id,
  ScheduleParticipantRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ScheduleParticipant, dataSource);
  }
}
