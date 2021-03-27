import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Service, ServiceRelations, UserHasService, ScheduleHasUserHasService} from '../models';
import {UserHasServiceRepository} from './user-has-service.repository';
import {ScheduleHasUserHasServiceRepository} from './schedule-has-user-has-service.repository';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.id,
  ServiceRelations
> {

  public readonly userHasServices: HasManyRepositoryFactory<UserHasService, typeof Service.prototype.id>;

  public readonly scheduleHasUserHasServices: HasManyRepositoryFactory<ScheduleHasUserHasService, typeof Service.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserHasServiceRepository') protected userHasServiceRepositoryGetter: Getter<UserHasServiceRepository>, @repository.getter('ScheduleHasUserHasServiceRepository') protected scheduleHasUserHasServiceRepositoryGetter: Getter<ScheduleHasUserHasServiceRepository>,
  ) {
    super(Service, dataSource);
    this.scheduleHasUserHasServices = this.createHasManyRepositoryFactoryFor('scheduleHasUserHasServices', scheduleHasUserHasServiceRepositoryGetter,);
    this.registerInclusionResolver('scheduleHasUserHasServices', this.scheduleHasUserHasServices.inclusionResolver);
    this.userHasServices = this.createHasManyRepositoryFactoryFor('userHasServices', userHasServiceRepositoryGetter,);
    this.registerInclusionResolver('userHasServices', this.userHasServices.inclusionResolver);
  }
}
