import { Module } from '@nestjs/common';
import { ControllersController } from './user/controllers/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ControllersController],
  providers: [],
})
export class AppModule {}
