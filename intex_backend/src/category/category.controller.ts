import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RolesGuard } from 'src/Guards/roles.guard';
import { AuthGuard } from 'src/Guards/auth.guard';
import { RoleDec } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @RoleDec(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Kategoriya yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Kategoriya muvaffaqiyatli yaratildi',
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Barcha kategoriyalarni olish (paginatsiya + filter)',
  })
  @ApiResponse({
    status: 200,
    description: 'Kategoriyalar ro‘yxati qaytarildi',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
  })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
  ) {
    return this.categoryService.findAll({ page, limit, name });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Kategoriya ID orqali olish' })
  @ApiResponse({ status: 200, description: 'Kategoriya topildi' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Kategoriyani yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Kategoriya muvaffaqiyatli yangilandi',
  })
  @RoleDec(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kategoriyani o‘chirish' })
  @ApiResponse({
    status: 200,
    description: 'Kategoriya muvaffaqiyatli o‘chirildi',
  })
  @RoleDec(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
