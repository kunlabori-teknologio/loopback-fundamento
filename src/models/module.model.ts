import {Entity, model, property} from '@loopback/repository';

@model()
export class Module extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'}
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'any',
  })
  components?: any[];

  @property({
    type: 'date',
    deafult: () => null,
  })
  _deletedAt?: Date;

  @property({
    type: 'string',
    deafult: () => null,
  })
  _deletedBy?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  _createdAt: Date;

  @property({
    type: 'string',
  })
  _createdBy: string;

  @property({
    type: 'string',
  })
  _ownedBy: string;

  constructor(data?: Partial<Module>) {
    super(data);
  }
}

export interface ModuleRelations {
  // describe navigational properties here
}

export type ModuleWithRelations = Module & ModuleRelations;
