import {Entity, model, property, hasMany} from '@loopback/repository';
import {PaymentHasBankSlip} from './payment-has-bank-slip.model';

@model()
export class BankSlip extends Entity {
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
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  link: string;

  @property({
    type: 'date',
    required: true,
  })
  expirationDate: string;

  @hasMany(() => PaymentHasBankSlip)
  paymentHasBankSlips: PaymentHasBankSlip[];

  constructor(data?: Partial<BankSlip>) {
    super(data);
  }
}

export interface BankSlipRelations {
  // describe navigational properties here
}

export type BankSlipWithRelations = BankSlip & BankSlipRelations;
