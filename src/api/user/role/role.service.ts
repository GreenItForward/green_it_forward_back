import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { RoleEnum } from "@/common/enums/role.enum";
import { UserService } from "../user.service";
import { Request } from "express";
import { ChangeRoleDto } from "../user.dto";

@Injectable()
export class RoleService {  
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  
  
  public async getRole(id: number): Promise<RoleEnum> {
    const user = await this.userService.getUser(id);
    return user.role;
  }

  public async getUserRole(req: Request): Promise<RoleEnum> {
    const user: User = <User>req.user;
    return user.role;
  }

  public async getAllRoles(): Promise<RoleEnum[]> {
    return Object.values(RoleEnum);
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
    const userToModify = await this.userService.getUser(body.userId);
    if(!userToModify) {
      throw new NotFoundException("L'utilisateur que vous avez spécifié n'existe pas");
    }
    /*
    if(userToModify.role == RoleEnum.ADMINISTRATEUR && roleAsker == RoleEnum.MODERATEUR) {
      throw new ForbiddenException("Vous ne pouvez pas modifier le role d'un administrateur")
    }
    */
    user.role = body.role;
    await this.userRepository.save(user);

    return await this.getRole(user.id);
  }
}
