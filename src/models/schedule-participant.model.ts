import {Entity, model, property} from '@loopback/repository';

@model()
export class ScheduleParticipant extends Entity {
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
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  document?: string;

  @property({
    type: 'string',
  })
  documentCountry?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
  })
  scheduleId?: string;

  constructor(data?: Partial<ScheduleParticipant>) {
    super(data);
  }
}

export interface ScheduleParticipantRelations {
  // describe navigational properties here
}

export type ScheduleParticipantWithRelations = ScheduleParticipant & ScheduleParticipantRelations;
