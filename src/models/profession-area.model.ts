import {Entity, model, property, hasMany} from '@loopback/repository';
import {Profession} from './profession.model';

@model()
export class ProfessionArea extends Entity {
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

  @hasMany(() => Profession)
  professions: Profession[];

  constructor(data?: Partial<ProfessionArea>) {
    super(data);
  }
}

export interface ProfessionAreaRelations {
  // describe navigational properties here
}

export type ProfessionAreaWithRelations = ProfessionArea & ProfessionAreaRelations;
