import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto, UpdateLectureDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  // Create Lecture
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createLecture(
    @Body() dto: CreateLectureDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const fileUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.lectureService.create(dto, fileUrl);
  }

  // Update Lecture
  @Put(':lect_no')
  @UseInterceptors(FileInterceptor('file'))
  async updateLecture(
    @Param('lect_no', ParseIntPipe) lect_no: number,
    @Body() dto: UpdateLectureDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const fileUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.lectureService.update({ ...dto, lect_no }, fileUrl);
  }

  // List paginated lectures
  @Get()
  async listLectures(@Query('page') page = 1) {
    return this.lectureService.list(+page);
  }

  // List single (단일상품) lectures
  @Get('single')
  async singleLectureList() {
    return this.lectureService.singleList();
  }

  // List all visible lectures
  @Get('all')
  async allLectures() {
    return this.lectureService.allLectures();
  }

  // Get mixed lecture items
  @Get('mixed/:refNo')
  async getMixedLecture(@Param('refNo', ParseIntPipe) refNo: number) {
    return this.lectureService.getMixedLecture(refNo);
  }

  // View specific lecture
  @Get(':lectNo')
  async viewLecture(@Param('lectNo', ParseIntPipe) lectNo: number) {
    return this.lectureService.view(lectNo);
  }

  // Get list of books (상품 리스트)
  @Get('books/list')
  async bookList() {
    return this.lectureService.bookList();
  }

  // Get lectures by category
  @Get('category/:lectcate_no')
  async findByCategory(
    @Param('lectcate_no', ParseIntPipe) lectcate_no: number,
  ) {
    return this.lectureService.findByCategory(lectcate_no);
  }
}
