export class BasketItemDto {
  code: number; // ��ǰ�ڵ�
  name?: string; // ��ǰ�� (optional)
  quantity: number; // ����
  price?: number; // ���� (optional)
  type?: 'book' | 'lecture'; // ��ǰ ����
}
