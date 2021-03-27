import {Entity, model, property} from '@loopback/repository';

@model()
export class ScheduleSetting extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  day?: number;

  @property({
    type: 'number',
  })
  dayInitialTime?: number;

  @property({
    type: 'number',
  })
  dayEndTime?: number;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'number',
  })
  dateInitialTime?: number;

  @property({
    type: 'number',
  })
  dateEndTime?: number;

  @property({
    type: 'string',
  })
  dateStatus?: string;

  @property({
    type: 'number',
  })
  attendanciesQuantity?: number;

  @property({
    type: 'string',
  })
  userExtendedId?: string;

  constructor(data?: Partial<ScheduleSetting>) {
    super(data);
  }
}

export interface ScheduleSettingRelations {
  // describe navigational properties here
}

export type ScheduleSettingWithRelations = ScheduleSetting & ScheduleSettingRelations;
