import {Entity, model, property} from '@loopback/repository';

@model()
export class ServicePayment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  paymentId?: string;

  @property({
    type: 'string',
  })
  userHasServiceId?: string;

  constructor(data?: Partial<ServicePayment>) {
    super(data);
  }
}

export interface ServicePaymentRelations {
  // describe navigational properties here
}

export type ServicePaymentWithRelations = ServicePayment & ServicePaymentRelations;
