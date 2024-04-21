import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/Entities/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/dto/signUp.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { LoginDto } from 'src/dto/logIn.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from './user.service';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly mailerService: MailerService,
    private usersService: UsersService,
  ) {}

  async generateAccessToken(id: string) {
    const jwtSecret = this.configService.get<string>('SECRET_KEY');
    return this.jwtService.sign({ id }, { secret: jwtSecret });
  }

  async generateResetToken(email: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = uuidv4();
    await this.usersService.setResetPasswordToken(String(user.id), resetToken);

    return resetToken;
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { email, password } = signUpDto;
    const existingUser = await this.UserRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.UserRepository.create({
      email: email,
      password: hashedPassword,
    });

    await this.UserRepository.save(newUser);
    const token = await this.generateAccessToken(String(newUser.id));

    return { token };
  }

  async logIn(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.UserRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.generateAccessToken(String(user.id));
    return { token };
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = await this.generateResetToken(email);
    await this.usersService.setResetPasswordToken(String(user.id), resetToken);

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      template: './reset-password',
      context: {
        resetLink,
      },
    });
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.updatePassword(user.id, hashedPassword);

    await this.usersService.clearResetToken(user.id);
  }
}
