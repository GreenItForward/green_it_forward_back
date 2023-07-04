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
import { readFileSync } from "fs";
import { join } from "path";

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}


  @Get('generate-pdf/:name/:amount')/*
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)*/
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
      const fileName = 'output.pdf';
      await this.invoiceService.generatePdf(name, amount, date, last4, brandCard, project);

      const filePath = join(process.cwd(), fileName);
      const file = readFileSync(filePath);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.setHeader('Content-Length', file.length);
      res.end(file); 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}