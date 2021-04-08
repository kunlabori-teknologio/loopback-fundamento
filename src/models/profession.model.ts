import {Entity, hasMany, model, property} from '@loopback/repository';
import {ProfessionSpecialty} from './profession-specialty.model';

@model()
export class Profession extends Entity {
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

  @property({
    type: 'string',
  })
  professionAreaId?: string;

  @hasMany(() => ProfessionSpecialty)
  professionSpecialties: ProfessionSpecialty[];

  constructor(data?: Partial<Profession>) {
    super(data);
  }
}

export interface ProfessionRelations {
  // describe navigational properties here
}

export type ProfessionWithRelations = Profession & ProfessionRelations;
