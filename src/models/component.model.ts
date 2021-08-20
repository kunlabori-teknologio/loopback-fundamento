import {Entity, model, property} from '@loopback/repository';

@model()
export class Element extends Entity {
  @property({
    type: 'string',
  })
  type: string;

  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  label: string;

  @property({
    type: 'string',
  })
  placeholder: string;

  @property({
    type: 'string',
  })
  dataType: string;

  @property({
    type: 'string',
  })
  columnTitle: string;

  @property({
    type: 'string',
  })
  rowField: string;

  @property({
    type: 'string',
  })
  rowType: string;
}

@model()
export class Component extends Entity {
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
    jsonSchema: {
      enum: ['form', 'table'],
    },
  })
  formType: string;

  @property({
    type: 'array',
    itemType: Element,
    default: [],
  })
  elements?: Element[];

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


  constructor(data?: Partial<Component>) {
    super(data);
  }
}

export interface ComponentRelations {
  // describe navigational properties here
}

export type ComponentWithRelations = Component & ComponentRelations;
