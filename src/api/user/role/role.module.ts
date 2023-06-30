import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserModule } from '../user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => UserModule)],

  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}