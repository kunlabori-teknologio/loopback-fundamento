import {Entity, model, property, hasMany} from '@loopback/repository';
import {UserHasService} from './user-has-service.model';
import {ScheduleHasUserHasService} from './schedule-has-user-has-service.model';

@model()
export class Service extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => UserHasService)
  userHasServices: UserHasService[];

  @hasMany(() => ScheduleHasUserHasService)
  scheduleHasUserHasServices: ScheduleHasUserHasService[];

  constructor(data?: Partial<Service>) {
    super(data);
  }
}

export interface ServiceRelations {
  // describe navigational properties here
}

export type ServiceWithRelations = Service & ServiceRelations;
