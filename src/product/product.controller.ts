import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/product.dto';
import { ProductPatchDto } from './dto/product_update.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async fetch() {
    return this.productService.fetch();
  }

  @Get(':id')
  async fetchDetail(@Param('id') id: string) {
    return this.productService.fetchDetail(id);
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('product_image'))
  async addProduct(
    @Body() body: ProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1000 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.productService.addProduct(body, file);
  }

  @Patch('edit/:id')
  @UseInterceptors(FileInterceptor('product_image'))
  async patchProduct(
    @Param('id') id: string,
    @Body() body: ProductPatchDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1000 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return await this.productService.patchProduct(id, body, file);
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
