import {Entity, model, property, hasMany} from '@loopback/repository';
import {CompanyHasCompanyActivity} from './company-has-company-activity.model';

@model()
export class CompanyActivity extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @hasMany(() => CompanyHasCompanyActivity)
  companyHasCompanyActivities: CompanyHasCompanyActivity[];

  constructor(data?: Partial<CompanyActivity>) {
    super(data);
  }
}

export interface CompanyActivityRelations {
  // describe navigational properties here
}

export type CompanyActivityWithRelations = CompanyActivity & CompanyActivityRelations;
