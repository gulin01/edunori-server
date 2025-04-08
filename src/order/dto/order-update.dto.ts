import { CreateOrderDto } from './order-create.dto';

export class UpdateOrderDto extends CreateOrderDto {
  state: string;
}
