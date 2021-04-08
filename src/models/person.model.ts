import {Entity, hasMany, model, property} from '@loopback/repository';
import {CompanyHasPersonHasRole} from './company-has-person-has-role.model';
import {CompanyHasPerson} from './company-has-person.model';
import {PersonHasProfessionSpecialty} from './person-has-profession-specialty.model';

@model()
export class Person extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'date',
    required: true,
  })
  birthdate: string;

  @property({
    type: 'string',
  })
  parentName1?: string;

  @property({
    type: 'string',
  })
  parentName2?: string;

  @property({
    type: 'string',
  })
  userExtendedId?: string;

  @hasMany(() => PersonHasProfessionSpecialty)
  personHasProfessionSpecialties: PersonHasProfessionSpecialty[];

  @hasMany(() => CompanyHasPersonHasRole)
  companyHasPersonHasRoles: CompanyHasPersonHasRole[];

  @hasMany(() => CompanyHasPerson)
  companyHasPeople: CompanyHasPerson[];

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
