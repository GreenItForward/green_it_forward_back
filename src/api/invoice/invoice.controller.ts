import { Controller, Get, HttpException, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':name/:amount')
  async downloadPdf(
    @Param('name') name: string,
    @Param('amount') amount: number,
    @Query('date') date: string,
    @Query('last4') last4: string,
    @Query('brand') brandCard: string,
    @Res() res: Response,
  ) {
    try {
      const pdfBuffer = await this.invoiceService.generatePdf(name, amount, date, last4, brandCard);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=invoice.pdf`);
      res.setHeader('Content-Length', pdfBuffer.length);
      res.end(pdfBuffer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
