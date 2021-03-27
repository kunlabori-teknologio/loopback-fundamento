import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ScheduleSetting, ScheduleSettingRelations} from '../models';

export class ScheduleSettingRepository extends DefaultCrudRepository<
  ScheduleSetting,
  typeof ScheduleSetting.prototype.id,
  ScheduleSettingRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ScheduleSetting, dataSource);
  }
}
