import { IsNumber } from 'class-validator';

export class ProductPatchDto {
  product_name: string;

  @IsNumber()
  price: number;

  description: string;
}
