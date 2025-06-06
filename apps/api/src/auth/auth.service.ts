import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private databaseService: DatabaseService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const token = this.generateToken(user.id, user.role, user.name);

    return { access_token: token };
  }

  async register(name: string, email: string, password: string) {
    const existingUserName = await this.databaseService.user.findUnique({
      where: { name },
    });

    if (existingUserName)
      throw new ForbiddenException({
        message: 'User with this name already exists',
      });

    const existingUserEmail = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (existingUserEmail)
      throw new ForbiddenException({
        message: 'User with this email already exists',
      });

    const hashedPassword = await hash(password, 10);

    const newUser = await this.databaseService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });

    const token = this.generateToken(newUser.id, newUser.role, newUser.name);

    return { access_token: token };
  }

  private generateToken(userId: string, role: string, name: string) {
    const payload = { sub: userId, role, name };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
