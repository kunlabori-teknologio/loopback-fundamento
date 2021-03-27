import {Entity, model, property, hasMany} from '@loopback/repository';
import {PaymentHasCreditCard} from './payment-has-credit-card.model';

@model()
export class CreditCard extends Entity {
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
  gatewayId: string;

  @property({
    type: 'string',
    required: true,
  })
  lastFourNumbers: string;

  @property({
    type: 'string',
    required: true,
  })
  label: string;

  @property({
    type: 'number',
    required: true,
  })
  expirationMonth: string;

  @property({
    type: 'number',
    required: true,
  })
  expirationYear: number;

  @property({
    type: 'string',
    required: true,
  })
  holderName: string;

  @property({
    type: 'string',
  })
  userExtendedId?: string;

  @hasMany(() => PaymentHasCreditCard)
  paymentHasCreditCards: PaymentHasCreditCard[];

  constructor(data?: Partial<CreditCard>) {
    super(data);
  }
}

export interface CreditCardRelations {
  // describe navigational properties here
}

export type CreditCardWithRelations = CreditCard & CreditCardRelations;
