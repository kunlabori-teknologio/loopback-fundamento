import {Entity, model, property, hasMany} from '@loopback/repository';
import {PersonHasProfessionSpecialty} from './person-has-profession-specialty.model';

@model()
export class ProfessionSpecialty extends Entity {
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
  })
  professionId?: string;

  @hasMany(() => PersonHasProfessionSpecialty)
  personHasProfessionSpecialties: PersonHasProfessionSpecialty[];

  constructor(data?: Partial<ProfessionSpecialty>) {
    super(data);
  }
}

export interface ProfessionSpecialtyRelations {
  // describe navigational properties here
}

export type ProfessionSpecialtyWithRelations = ProfessionSpecialty & ProfessionSpecialtyRelations;
