// toss.types.ts
export interface TossConfirmResponse {
  paymentKey: string;
  orderId: string;
  status: string;
  approvedAt: string;
  totalAmount: number;
  [key: string]: any;
}

export interface TossPaymentLinkResponse {
  checkoutUrl: string;
  paymentLinkId: string;
  orderId: string;
}
