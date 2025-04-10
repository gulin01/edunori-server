// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepo.find({ relations: ['goods'] });
  }

  async findOne(code: number): Promise<ProductEntity | null> {
    return this.productRepo.findOne({ where: { code }, relations: ['goods'] });
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepo.create(dto);
    return this.productRepo.save(newProduct);
  }

  async update(code: number, dto: UpdateProductDto): Promise<ProductEntity> {
    await this.productRepo.update(code, dto);

    const updated = await this.findOne(code);
    if (!updated) {
      throw new NotFoundException(`Product with code ${code} not found`);
    }

    return updated;
  }
  async remove(code: number): Promise<void> {
    await this.productRepo.delete(code);
  }
}
