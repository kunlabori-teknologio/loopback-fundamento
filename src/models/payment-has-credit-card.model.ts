import {Entity, model, property} from '@loopback/repository';

@model()
export class PaymentHasCreditCard extends Entity {
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
  creditCardId?: string;

  constructor(data?: Partial<PaymentHasCreditCard>) {
    super(data);
  }
}

export interface PaymentHasCreditCardRelations {
  // describe navigational properties here
}

export type PaymentHasCreditCardWithRelations = PaymentHasCreditCard & PaymentHasCreditCardRelations;
