import { RoleService } from './role/role.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
  ForbiddenException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { MeDto, UpdateUserDto } from "./user.dto";
import { join } from 'path';
import { readFile } from 'fs/promises';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  constructor(
    @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
  ) {
  }


  public async updateUser(body: UpdateUserDto, user: User): Promise<MeDto> {
    if (!user) {
      throw new ForbiddenException('User is undefined');
    }

    user.firstName = body.firstName || user.firstName;
    user.lastName = body.lastName || user.lastName;
    user.email = body.email || user.email;
    await this.repository.save(user);
    return user;
  }

  public async updateImage(user: User, file: Express.Multer.File): Promise<MeDto> {
    console.log(user);
    if (!user) {
      throw new ForbiddenException('User is undefined');
    }

    user.imageUrl = file ? join("uploads", file.filename) : null;

    await this.repository.save(user);
    return user;
  }

 
  public async getUser(id: number):Promise<User> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException('Aucun utilisateur trouvé.');
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

  admin(): Promise<User[]> {
    return this.repository.find();
  }

  async getBase64Image(imagePath: string): Promise<string | null> {
    try {
      const absolutePath = join(process.cwd(), imagePath);
      const file = await readFile(absolutePath);
      const base64Image = file.toString('base64');
      return base64Image;
    } catch (error) {
      console.error('Failed to convert image to base64', error);
      return null;
    }
  }
}