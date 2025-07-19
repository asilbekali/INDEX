import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RolesGuard } from 'src/Guards/roles.guard';
import { RoleDec } from './decorator/roles.decorator';
import { Role } from './enum/role.enum';
import { AuthGuard } from 'src/Guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-admin')
  @ApiOperation({ summary: 'Register admin user' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, description: 'Admin registered successfully' })
  register_admin(@Body() dto: CreateAuthDto) {
    return this.authService.register_admin(dto);
  }

  @Post('register-super_admin')
  @ApiOperation({ summary: 'Register super admin user' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({
    status: 201,
    description: 'Super admin registered successfully',
  })
  register_super_admin(@Body() dto: CreateAuthDto) {
    return this.authService.register_super_admin(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  login(@Body() dto: CreateAuthDto) {
    return this.authService.login(dto);
  }

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Get all users with optional filters and pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (optional)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page (optional)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search by name or email (optional)',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    description: 'Filter by role (optional)',
  })
  @ApiResponse({ status: 200, description: 'Users list fetched successfully' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('role') role?: string,
  ) {
    return this.authService.findAll({ page, limit, search, role });
  }

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: UpdateAuthDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAuthDto) {
    return this.authService.update(id, dto);
  }

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authService.remove(id);
  }
}
