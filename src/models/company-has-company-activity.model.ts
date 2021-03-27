import {Entity, model, property} from '@loopback/repository';

@model()
export class CompanyHasCompanyActivity extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  companyId?: string;

  @property({
    type: 'string',
  })
  companyActivityId?: string;

  constructor(data?: Partial<CompanyHasCompanyActivity>) {
    super(data);
  }
}

export interface CompanyHasCompanyActivityRelations {
  // describe navigational properties here
}

export type CompanyHasCompanyActivityWithRelations = CompanyHasCompanyActivity & CompanyHasCompanyActivityRelations;
