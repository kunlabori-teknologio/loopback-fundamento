import {Entity, hasMany, model, property} from '@loopback/repository';
import {Module} from './module.model';

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

  @hasMany(() => Module)
  modules?: Module[];

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
