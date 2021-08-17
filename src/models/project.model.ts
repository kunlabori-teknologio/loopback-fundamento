import {Entity, model, property} from '@loopback/repository';

@model()
export class Project extends Entity {
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
    required: true,
  })
  path: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  modules?: string[];

  @property({
    type: 'date',
  })
  _deletedAt?: string;

  @property({
    type: 'string',
  })
  _deletedBy?: string;

  @property({
    type: 'date',
    required: true,
  })
  _createdAt: string;

  @property({
    type: 'string',
    required: true,
  })
  _createdBy: string;

  @property({
    type: 'string',
    required: true,
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
