import {Entity, model, property} from '@loopback/repository';

@model()
export class ScheduleHasUserHasService extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  scheduleId?: string;

  @property({
    type: 'string',
  })
  serviceId?: string;

  @property({
    type: 'string',
  })
  userExtendedId?: string;

  constructor(data?: Partial<ScheduleHasUserHasService>) {
    super(data);
  }
}

export interface ScheduleHasUserHasServiceRelations {
  // describe navigational properties here
}

export type ScheduleHasUserHasServiceWithRelations = ScheduleHasUserHasService & ScheduleHasUserHasServiceRelations;
