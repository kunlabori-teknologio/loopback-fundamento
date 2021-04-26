import {User} from '@loopback/authentication-jwt';
import {hasMany, hasOne, model} from '@loopback/repository';
import {Address} from './address.model';
import {Company} from './company.model';
import {CreditCard} from './credit-card.model';
import {Person} from './person.model';
import {ScheduleHasUserHasService} from './schedule-has-user-has-service.model';
import {ScheduleSetting} from './schedule-setting.model';
import {Schedule} from './schedule.model';
import {UserHasService} from './user-has-service.model';

@model()
export class UserExtended extends User {
  @hasOne(() => Person)
  person: Person;

  @hasOne(() => Company)
  company: Company;

  @hasMany(() => Address)
  addresses: Address[];

  @hasMany(() => CreditCard)
  creditCards: CreditCard[];

  @hasMany(() => ScheduleSetting)
  scheduleSettings: ScheduleSetting[];

  @hasMany(() => Schedule)
  schedules: Schedule[];

  @hasMany(() => UserHasService)
  userHasServices: UserHasService[];

  @hasMany(() => ScheduleHasUserHasService)
  scheduleHasUserHasServices: ScheduleHasUserHasService[];

  constructor(data?: Partial<UserExtended>) {
    super(data);
  }
}

export interface UserExtendedRelations {
  // describe navigational properties here
}

export type UserExtendedWithRelations = UserExtended & UserExtendedRelations;

export interface UserPermission {
  creatorId: String;
  name: String;
  ownerId: String;
  projectId: String;
  routes: UserRoute[];
  _id: Id;
}

export interface UserRoute {
  name: String;
  source: String;
  actions?: Id[];
}

// Either import this interface from mongodb directly or make this centralized
export interface Id {
  $oid: String;
}
