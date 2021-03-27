import {Entity, model, property} from '@loopback/repository';

@model()
export class PersonHasProfessionSpecialty extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  personId?: string;

  @property({
    type: 'string',
  })
  professionSpecialtyId?: string;

  constructor(data?: Partial<PersonHasProfessionSpecialty>) {
    super(data);
  }
}

export interface PersonHasProfessionSpecialtyRelations {
  // describe navigational properties here
}

export type PersonHasProfessionSpecialtyWithRelations = PersonHasProfessionSpecialty & PersonHasProfessionSpecialtyRelations;
