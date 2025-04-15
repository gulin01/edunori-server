export interface BasketItemForOrder {
  code: number; // gd_code
  type: 'book' | 'lecture';
  quantity: number;
  gd_price: number;
  gd_subject: string;
  card_pay_install?: number;
  lect_days?: number;
}
