import {Entity, model, property} from '@loopback/repository';

@model()
export class CompanyHasPersonHasRole extends Entity {
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
  personId?: string;

  @property({
    type: 'string',
  })
  roleId?: string;

  constructor(data?: Partial<CompanyHasPersonHasRole>) {
    super(data);
  }
}

export interface CompanyHasPersonHasRoleRelations {
  // describe navigational properties here
}

export type CompanyHasPersonHasRoleWithRelations = CompanyHasPersonHasRole & CompanyHasPersonHasRoleRelations;
