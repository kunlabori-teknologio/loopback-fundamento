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
    itemType: 'string',
  })
  components?: string[];

  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectId'}
  })
  projectId: string;

  constructor(data?: Partial<Module>) {
    super(data);
  }
}

export interface ModuleRelations {
  // describe navigational properties here
}

export type ModuleWithRelations = Module & ModuleRelations;
