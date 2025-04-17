import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('books')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Get('bestsellers')
  @ApiOperation({ summary: 'Get bestseller books (via banner_info)' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of bestseller book banners.',
  })
  async getBestsellers() {
    return this.service.getBestsellerBanners();
  }
}
