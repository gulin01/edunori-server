// toss.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TossConfirmResponse, TossPaymentLinkResponse } from './toss.types';

@Injectable()
export class TossService {
  private readonly SECRET_KEY: string;

  constructor() {
    if (!process.env.TOSS_SECRET_KEY) {
      throw new Error(
        'TOSS_SECRET_KEY is not defined in the environment variables',
      );
    }
    this.SECRET_KEY = process.env.TOSS_SECRET_KEY;
  }
  private getAuthHeader(): string {
    return `Basic ${Buffer.from(`${this.SECRET_KEY}:`).toString('base64')}`;
  }

  async requestPayment(data: {
    orderId: string;
    amount: number;
    orderName: string;
    customerEmail: string;
    customerName: string;
  }): Promise<TossPaymentLinkResponse> {
    const response = await axios.post<TossPaymentLinkResponse>(
      'https://api.tosspayments.com/v1/payment-links',
      {
        orderId: data.orderId,
        amount: data.amount,
        orderName: data.orderName,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        successUrl: 'myapp://toss/success', // << use app scheme if needed
        failUrl: 'myapp://toss/fail',
      },
      {
        headers: {
          Authorization: this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  async confirmPayment(
    paymentKey: string,
    orderId: string,
    amount: number,
  ): Promise<TossConfirmResponse> {
    const response = await axios.post<TossConfirmResponse>(
      `https://api.tosspayments.com/v1/payments/confirm`,
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
