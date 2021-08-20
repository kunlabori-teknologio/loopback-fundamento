import {Entity, model, property} from '@loopback/repository';

@model()
export class Project extends Entity {
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
    type: 'string',
    required: true,
  })
  path: string;

  @property({
    type: 'array',
    itemType: 'any'
  })
  modules?: any[];

  @property({
    type: 'string',
  })
  tokenTtl: string;

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


  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
