import {Entity, model, property, hasMany} from '@loopback/repository';
import {Person} from './person.model';

@model()
export class CompanyHasPerson extends Entity {
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

  @hasMany(() => Person)
  people: Person[];

  constructor(data?: Partial<CompanyHasPerson>) {
    super(data);
  }
}

export interface CompanyHasPersonRelations {
  // describe navigational properties here
}

export type CompanyHasPersonWithRelations = CompanyHasPerson & CompanyHasPersonRelations;
