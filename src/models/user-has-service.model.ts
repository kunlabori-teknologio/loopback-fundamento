import {Entity, model, property, hasOne} from '@loopback/repository';
import {ServicePayment} from './service-payment.model';

@model()
export class UserHasService extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
  })
  userExtendedId?: string;

  @property({
    type: 'string',
  })
  serviceId?: string;

  @hasOne(() => ServicePayment)
  servicePayment: ServicePayment;

  constructor(data?: Partial<UserHasService>) {
    super(data);
  }
}

export interface UserHasServiceRelations {
  // describe navigational properties here
}

export type UserHasServiceWithRelations = UserHasService & UserHasServiceRelations;
