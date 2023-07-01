import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { TokenResponse } from '@/common/types/token-response.interface';
import { MailService } from '@/api/mailer/mail.service';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(
    private readonly mailService: MailService,
  ) {}

  public async register(body: RegisterDto): Promise<User> {
    const { firstName, lastName, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOneBy({ email });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.firstLoginAt = new Date();

    await this.repository.save(user);

    this.mailService.sendUserConfirmation(user);

    return user;
  }

  public async login(body: LoginDto): Promise<TokenResponse> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOneBy({ email });
 
    if (!user) {
      throw new HttpException('That email/username and password combination didn\'t work', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('That email/username and password combination didn\'t work', HttpStatus.NOT_FOUND);
    }

    if (!user.isVerified) {
      throw new HttpException('Please confirm your email address', HttpStatus.FORBIDDEN);
    }

    await this.repository.update(user.id, {lastLoginAt: new Date()});

    return {token: this.helper.generateToken(user)};
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}