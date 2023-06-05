import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = 3400;

  app.enableCors();
  app.enableVersioning();
  app.setGlobalPrefix('api');
  
  await app.listen(port, () => {
    new Logger('NestApplication').log(`Server is running on : http://localhost:` + port);
  });
/*
  const nodemailer = require('nodemailer');  
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true, // use SSL 
    auth: { 
      user: `${config.get<string>('EMAIL_ADDRESS')}`,
      pass: `${config.get<string>('EMAIL_PASSWORD')}`  
    },
  }); 

  const mailOptions = {
    from: '"Support GreenItForward" <noreply.greenitforward@abib-james.fr>',
    to: `james.bidule@gmail.com`,
    subject: 'Réinitialisation de votre mot de passe', 
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #007BFF;">Réinitialisation de mot de passe</h1>
          <p>Bonjour,</p>
          <p>Nous avons reçu une demande de réinitialisation de votre mot de passe sur <NOM DU SITE>. Si vous n'avez pas fait cette demande, veuillez ignorer cet e-mail.</p>
          <p>Si vous avez fait cette demande, veuillez cliquer sur le bouton ci-dessous pour réinitialiser votre mot de passe :</p>
          <div style="text-align: center;">
            <a href="https://www.google.com" style="background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px auto; display: inline-block;">Réinitialiser le mot de passe</a>
          </div>
          <p>Ce lien de réinitialisation expirera dans 30 minutes.</p>
          <p>Si vous rencontrez des problèmes, veuillez nous contacter à noreply.greenitforward@abib-james.fr.</p>
          <p>Merci,</p>
          <p>L'équipe GreenItForward</p>
      </div>
    `,
  };
  

transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error('there was an error: ', err);
      res.status(401).json(err);
    } else {
       console.log('here is the res: ', res);
      res.status(200).json('recovery email sent');
    }
  });*/
}
bootstrap();