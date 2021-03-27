import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {PaymentHasCreditCard} from './payment-has-credit-card.model';
import {PaymentHasBankSlip} from './payment-has-bank-slip.model';
import {ServicePayment} from './service-payment.model';

@model()
export class Payment extends Entity {
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
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  gatewayId: string;

  @property({
    type: 'date',
    required: true,
  })
  paymentDate: string;

  @hasMany(() => PaymentHasCreditCard)
  paymentHasCreditCards: PaymentHasCreditCard[];

  @hasMany(() => PaymentHasBankSlip)
  paymentHasBankSlips: PaymentHasBankSlip[];

  @hasOne(() => ServicePayment)
  servicePayment: ServicePayment;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
