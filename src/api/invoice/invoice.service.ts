import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import imageSize from 'image-size';
import * as path from 'path';
import { Project } from '../project/project.entity';

const PDFDocument = require('pdfkit-table');
@Injectable()
export class InvoiceService {
  constructor() { }

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

  async generatePdf(name, amount, date, last4, brandCard, project:Project) {

    if (!name || !amount || !date || !last4 || !brandCard || !project) {
      throw new Error('Missing parameters');
    }

  
    const doc = new PDFDocument();
    const stream = doc.pipe(fs.createWriteStream('output.pdf'));
  
    doc.text(`N° Attestation du don : ${project.id}-${new Date().getTime()}`, { align: 'left' })
      .moveDown(2);
    
    const logoImagePath = path.join(process.cwd(), 'src', 'assets', 'logo.png');

    const logoDimensions = imageSize(logoImagePath);
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    
    const scaleFactor = 150 / logoDimensions.width;
    const imageWidth = logoDimensions.width * scaleFactor;
    const imageHeight = logoDimensions.height * scaleFactor;
    
    const x = (pageWidth / 2) - (imageWidth / 2);
    
    doc.image(logoImagePath, x, 70, { width: imageWidth, height: imageHeight }).moveDown(8);
  
    doc.fontSize(20)
      .text(`Merci pour votre don à l\'association ${project.name} !`, { align: 'center', underline: true })
      .moveDown();

      if (project.totalAmount > project.amountRaised) {
      doc.fontSize(18)
      .text(`Il reste ${project.totalAmount - project.amountRaised} € à récolter pour atteindre l'objectif de ${project.totalAmount} €`, { align: 'center' })
      .moveDown();
    }else{
      doc.fontSize(18)
      .text(`L'objectif de ${project.totalAmount} € a été atteint merci à vous !`, { align: 'center' })
      .moveDown();
    }

    doc.fontSize(18)
      .text('Récapitulatif de paiement', { underline: true })
      .moveDown();
  
    doc.text(`Nom sur la carte : ${name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`)
      .text(`Montant : ${amount} €`)
      .text(`Date : ${date || new Date().toLocaleDateString()}`)
      .moveDown();
  
    doc.text('Informations de la carte', { underline: true })
      .moveDown();
  
    const table = {
      headers: ['Type de carte', 'Numéro de carte'],
      rows: [
        [brandCard.charAt(0).toUpperCase() + brandCard.slice(1), `**** **** **** ${last4}`],
      ],
    };
    doc.table(table, { align: 'center' });  
    doc.fontSize(12)
    .text('GreenItForward France - 13 rue d\'Enghien 75010 Paris - 01 80 96 96 96', {
         align: 'center',
    })
    doc.end();
    await new Promise<void>((resolve) => {
      stream.on('finish', () => {
        resolve();
      });
    });
  }

}