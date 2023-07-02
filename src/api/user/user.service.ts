import { RoleService } from './role/role.service';
import {HttpException, HttpStatus, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Request } from "express";
import { User } from "./user.entity";
import { UpdateNameDto } from './user.dto';

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

  async verifyUserByToken(token: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { confirmationToken: token } });
    return user || null;
  }

  async verifyUser(token: string): Promise<{ status: string; message: string }> {
    const user = await this.verifyUserByToken(token);
    if (!user) {
      throw new HttpException('le token est invalide.', HttpStatus.BAD_REQUEST);
    }

    if (user.isVerified) {
      throw new HttpException(`l'utilisateur a déja été vérifié.`, HttpStatus.BAD_REQUEST);
    }

    user.isVerified = true;
    user.confirmationToken = null;
    await this.repository.save(user);

    return { status: 'success', message: 'User verified successfully' };
  }
}