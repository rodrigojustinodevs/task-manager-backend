import { 
    Controller, 
    Post, 
    UseGuards, 
    Request, 
    Body,
} from '@nestjs/common';
import { AuthService } from '../../application/services/auth/auth.service';
import { JwtAuthGuard } from '../../application/services/auth/jwt-auth.guard';
import { Response } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtected(@Request() req) {
    return req.user;
  }
}
