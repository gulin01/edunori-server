import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiSecurity,
  ApiParam,
} from '@nestjs/swagger';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { AuthRequest } from 'src/common/types/auth-request.interface';
import { AdminJwtAuthGuard } from 'src/auth/guards/admin-jwt.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Interests')
// @ApiBearerAuth() // shows that this route uses JWT
@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @ApiBearerAuth('admin-token')
  @ApiSecurity('admin-token') // ? links the lock icon to this specific endpoint
  @Post('add')
  @UseGuards(AdminJwtAuthGuard)
  @ApiBearerAuth('admin-token')
  @ApiSecurity('admin-token') // ? links the lock icon to this specific endpoint
  @ApiOperation({ summary: 'Create a new interest  (admin only)' })
  @ApiBody({ type: CreateInterestDto })
  @ApiResponse({ status: 201, description: 'Interest created successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() dto: CreateInterestDto) {
    return this.interestService.create(dto);
  }

  @Delete(':id')
  @UseGuards(AdminJwtAuthGuard)
  @HttpCode(204) // No Content
  @ApiOperation({ summary: 'Delete an interest by ID (admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'Interest ID to delete' })
  @ApiResponse({ status: 204, description: 'Interest deleted successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Interest not found' })
  delete(@Param('id') id: number) {
    return this.interestService.delete(id);
  }

  @Post('/user')
  @ApiBearerAuth('user-token')
  @ApiSecurity('user-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Save user-selected interest IDs' })
  @ApiBody({ schema: { type: 'array', items: { type: 'number' } } })
  @ApiResponse({ status: 200, description: 'User interests saved.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  setUserInterests(@Req() req: AuthRequest, @Body() interestIds: number[]) {
    return this.interestService.saveUserInterests(req.user.uid, interestIds);
  }

  @Get('user/selected/list')
  @ApiBearerAuth('user-token')
  @ApiSecurity('user-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get interests for the authenticated user' })
  @ApiResponse({ status: 200, description: 'User interests returned.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getUserInterests(@Req() req: AuthRequest) {
    return this.interestService.getUserInterests(req.user.uid);
  }
  @Get('list')
  @ApiOperation({
    summary: 'Get full list of available interests (for users and admins)',
  })
  @ApiResponse({ status: 200, description: 'Returns all available interests.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getAllInterests() {
    return this.interestService.getAllInterests();
  }
}
