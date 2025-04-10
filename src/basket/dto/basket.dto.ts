export class BasketItemDto {
  code: number;
  name?: string;
  quantity: number;
  price?: number;
  type?: 'book' | 'lecture';
}
