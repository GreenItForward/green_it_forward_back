import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Res,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { Response } from 'express';
import { InvoiceService } from './invoice.service';
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':name/:amount')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async downloadPdf(
    @Param('name') name: string,
    @Param('amount') amount: number,
    @Query('date') date: string,
    @Query('last4') last4: string,
    @Query('brand') brandCard: string,
    @Query('project') project: string,
    @Res() res: Response,
  ) {
    try {
      const pdfBuffer = await this.invoiceService.generatePdf(name, amount, date, last4, brandCard, project);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=invoice.pdf`);
      res.setHeader('Content-Length', pdfBuffer.length);
      res.end(pdfBuffer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
