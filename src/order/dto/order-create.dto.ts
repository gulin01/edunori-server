export class CreateOrderDto {
  id: string;
  name: string;
  order_name: string;
  email: string;
  address1: string;
  address2: string;
  phone: string;
  mobile_phone: string;
  zipcode: string;
  order_method: string;
  order_message?: string;
  card_pay_install?: number;
  basket: any[]; // basket item IDs or raw goods
  coupon_no?: string;
}
