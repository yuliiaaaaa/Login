import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/Services/auth.service';
import { LoginDto } from 'src/dto/logIn.dto';
import { SignUpDto } from 'src/dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.logIn(loginDto);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    await this.authService.sendResetPasswordEmail(body.email);
  }
}
