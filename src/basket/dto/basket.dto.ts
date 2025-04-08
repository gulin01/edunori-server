export class BasketItemDto {
  code: number; // 상품코드
  name?: string; // 상품명 (optional)
  quantity: number; // 수량
  price?: number; // 가격 (optional)
  type?: 'book' | 'lecture'; // 상품 유형
}
