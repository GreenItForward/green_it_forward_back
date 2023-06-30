import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Request } from "express";
import { ChangeRoleDto, UpdateNameDto } from "./user.dto";
import { User } from "./user.entity";
import { RoleEnum } from "@/common/enums/role.enum";

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.firstName = body.firstName;

    return this.repository.save(user);
  }

  public async changeRole(body: ChangeRoleDto, user: User): Promise<RoleEnum | never> {
    if (body.userId == user.id) {
      throw new ForbiddenException("Vous ne pouvez pas modifier votre propre rôle");
    }
    /*
    const roleAsker = await this.getRole(user.id);
    if(roleAsker == RoleEnum.MEMBRE) {
      throw new ForbiddenException("Vous n'avez pas les droits pour effectuer cette action");
    }
    */
    // Vérifie si l'utilisateur ciblé est dans le projet
    const userToModify = await this.getUser(body.userId);
    if(!userToModify) {
      throw new NotFoundException("L'utilisateur que vous avez spécifié n'existe pas");
    }
    /*
    if(userToModify.role == RoleEnum.ADMINISTRATEUR && roleAsker == RoleEnum.MODERATEUR) {
      throw new ForbiddenException("Vous ne pouvez pas modifier le role d'un administrateur")
    }
    */
    user.role = body.role;
    await this.repository.save(user);

    return await this.getRole(user.id);
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

  public async getRole(id: number): Promise<RoleEnum> {
    const user = await this.getUser(id);
    return user.role;
  }
}