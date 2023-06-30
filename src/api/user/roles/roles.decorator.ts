import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from "@/common/enums/role.enum";

export const Roles = (...args: RoleEnum[]) => SetMetadata('roles', args);
