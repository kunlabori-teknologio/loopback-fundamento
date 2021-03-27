import {Entity, model, property, hasMany} from '@loopback/repository';
import {ScheduleParticipant} from './schedule-participant.model';
import {ScheduleHasUserHasService} from './schedule-has-user-has-service.model';

@model()
export class Schedule extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  initialDateTime: string;

  @property({
    type: 'date',
    required: true,
  })
  endDateTime: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
  })
  userExtendedId?: string;

  @hasMany(() => ScheduleParticipant)
  scheduleParticipants: ScheduleParticipant[];

  @hasMany(() => ScheduleHasUserHasService)
  scheduleHasUserHasServices: ScheduleHasUserHasService[];

  constructor(data?: Partial<Schedule>) {
    super(data);
  }
}

export interface ScheduleRelations {
  // describe navigational properties here
}

export type ScheduleWithRelations = Schedule & ScheduleRelations;
