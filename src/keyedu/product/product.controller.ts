// product.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @Get(':code')
  getOne(@Param('code', ParseIntPipe) code: number) {
    return this.productService.findOne(code);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Put(':code')
  update(
    @Param('code', ParseIntPipe) code: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update(code, dto);
  }

  @Delete(':code')
  remove(@Param('code', ParseIntPipe) code: number) {
    return this.productService.remove(code);
  }
}
