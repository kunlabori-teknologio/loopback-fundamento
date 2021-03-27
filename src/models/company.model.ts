import {Entity, model, property, hasMany} from '@loopback/repository';
import {CompanyHasPerson} from './company-has-person.model';
import {CompanyHasCompanyActivity} from './company-has-company-activity.model';
import {CompanyHasPersonHasRole} from './company-has-person-has-role.model';

@model()
export class Company extends Entity {
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
  document: string;

  @property({
    type: 'string',
    required: true,
  })
  documentCountry: string;

  @property({
    type: 'string',
    required: true,
  })
  businessName: string;

  @property({
    type: 'string',
    required: true,
  })
  companyName: string;

  @property({
    type: 'date',
    required: true,
  })
  foundationDate: string;

  @property({
    type: 'string',
  })
  userExtendedId?: string;

  @hasMany(() => CompanyHasPerson)
  companyHasPeople: CompanyHasPerson[];

  @hasMany(() => CompanyHasCompanyActivity)
  companyHasCompanyActivities: CompanyHasCompanyActivity[];

  @hasMany(() => CompanyHasPersonHasRole)
  companyHasPersonHasRoles: CompanyHasPersonHasRole[];

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
