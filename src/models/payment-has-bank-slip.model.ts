import {Entity, model, property} from '@loopback/repository';

@model()
export class PaymentHasBankSlip extends Entity {
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
  bankSlipId?: string;

  constructor(data?: Partial<PaymentHasBankSlip>) {
    super(data);
  }
}

export interface PaymentHasBankSlipRelations {
  // describe navigational properties here
}

export type PaymentHasBankSlipWithRelations = PaymentHasBankSlip & PaymentHasBankSlipRelations;
