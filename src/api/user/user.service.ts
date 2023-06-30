import { RoleService } from './role/role.service';
import {Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Request } from "express";
import { User } from "./user.entity";
import { UpdateNameDto } from './role/user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  constructor(
    @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
  ) {}

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.firstName = body.firstName;

    return this.repository.save(user);
  }

  public async getUser(id: number):Promise<User> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException('Aucun rôle trouvé.');
    }

    return user;
  }


}