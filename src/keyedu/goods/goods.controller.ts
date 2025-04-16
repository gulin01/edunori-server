import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { GoodsQueryDto } from './dto/goods-query.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Goods')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new goods item' })
  @ApiBody({ type: CreateGoodsDto })
  @ApiResponse({ status: 201, description: 'Goods created successfully' })
  create(@Body() dto: CreateGoodsDto) {
    return this.goodsService.create(dto);
  }

  @Get('books')
  @ApiOperation({ summary: 'Get paginated list of books with filters' })
  @ApiResponse({
    status: 200,
    description: 'List of goods with pagination and filters',
    schema: {
      example: {
        data: [
          {
            code: 101,
            gd_subject: 'Math Workbook',
            state: 'active',
            product: {
              pd_name: 'Premium Math Series',
              category: 1,
              brand: 2,
            },
          },
        ],
        total: 50,
        page: 1,
        pageSize: 20,
      },
    },
  })
  getAllLectures(@Query() query: GoodsQueryDto) {
    return this.goodsService.getAllLectures(query);
  }

  @Get('lectures')
  @ApiOperation({ summary: 'Get paginated list of lectures with filters' })
  @ApiResponse({
    status: 200,
    description: 'List of goods with pagination and filters',
    schema: {
      example: {
        data: [
          {
            code: 101,
            gd_subject: 'Math Workbook',
            state: 'active',
            product: {
              pd_name: 'Premium Math Series',
              category: 1,
              brand: 2,
            },
          },
        ],
        total: 50,
        page: 1,
        pageSize: 20,
      },
    },
  })
  findAllBooks(@Query() query: GoodsQueryDto) {
    return this.goodsService.getAllBooks(query);
  }
  @Get(':code')
  @ApiOperation({ summary: 'Get a single goods item by code' })
  @ApiParam({ name: 'code', type: Number, description: 'Goods code' })
  @ApiResponse({ status: 200, description: 'Goods item found' })
  @ApiResponse({ status: 404, description: 'Goods item not found' })
  findOne(@Param('code') code: number) {
    return this.goodsService.findOne(code);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Delete a goods item by code' })
  @ApiParam({ name: 'code', type: Number, description: 'Goods code' })
  @ApiResponse({ status: 200, description: 'Goods deleted successfully' })
  @ApiResponse({ status: 404, description: 'Goods item not found' })
  delete(@Param('code') code: number) {
    return this.goodsService.delete(code);
  }
}
