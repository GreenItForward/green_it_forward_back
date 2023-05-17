import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InvoiceService {
  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  async getImageBase64(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async generatePdf(name: string, amount: number, date: string, last4:string, brandCard:string): Promise<Buffer> {
    if (!name || !amount || !date || !last4 || !brandCard) {      
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }



    const logoImagePath = path.join(process.cwd(),'src', 'assets', 'logo.png');
    const logoImageBase64 = await this.getImageBase64(logoImagePath);

    const docDefinition = {
        header: {
            columns: [
                {
                  text: `N° Attestation du don : ${Math.floor(Math.random() * 100000) + 1}`,
                  width: '50%',
                  alignment: 'left',
                  margin: [40, 20, 0, 0],
                },
                {
                  text: 'WWF',
                  width: '50%',
                  alignment: 'right',
                  margin: [0, 20, 40, 0],
                },
              ],
      },
      content: [
        {
          image: `data:image/png;base64,${logoImageBase64}`,
          width: 150,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'Merci pour votre don à l\'association WWF !',
          style: 'header',
          alignment: 'center',
          bold: true,
          fontSize: 20,
          margin: [0, 0, 0, 20],    
        },
        
        {
          text: 'Récapitulatif de paiement',
          style: 'header',
        },
        {
          text: `Nom sur la carte : ${name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
        },
        {
          text: `Montant : ${amount} €`,
        },
        {
          text: `Date : ${date || new Date().toLocaleDateString()}`,
        },
        {
            text: 'Informations de la carte',
            style: 'header',
            margin: [0, 20, 0, 10],
        },
        {
            table: {
                widths: ['*', '*'],
                body: [
                    ['Type de carte', brandCard.charAt(0).toUpperCase() + brandCard.slice(1)],
                    ['Numéro de carte', `**** **** **** ${last4}`],
                ],
            },
        },
      ],
      footer: {   
            columns: [
                {
                    text: 'GreenItForward France - 13 rue d\'Enghien 75010 Paris - 01 80 96 96 96',
                    alignment: 'center',
                    margin: [0, 20, 0, 0],
                },
            ],
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    return new Promise<Buffer>((resolve, reject) => {
      pdfDoc.getBuffer((buffer: Buffer) => {
        resolve(buffer);
      }, (error: any) => {
        reject(error);
      });
    });
  }
}
