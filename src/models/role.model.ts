import {Entity, model, property, hasMany} from '@loopback/repository';
import {CompanyHasPersonHasRole} from './company-has-person-has-role.model';

@model()
export class Role extends Entity {
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

  @hasMany(() => CompanyHasPersonHasRole)
  companyHasPersonHasRoles: CompanyHasPersonHasRole[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
