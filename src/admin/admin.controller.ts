import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new admin user' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: 'Admin user created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed or duplicate email.',
  })
  createAdmin(@Body() data: CreateAdminDto) {
    return this.adminService.create(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Admin login via email and password' })
  @ApiBody({ type: LoginAdminDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful and returns access token.',
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  login(@Body() dto: LoginAdminDto) {
    return this.adminService.validateAndLogin(dto.email, dto.password);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Find admin user by email' })
  @ApiResponse({ status: 200, description: 'Admin user found.' })
  @ApiResponse({ status: 404, description: 'Admin user not found.' })
  getByEmail(@Param('email') email: string) {
    return this.adminService.findByEmail(email);
  }
}
