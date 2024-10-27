import { Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser, UserDocument } from '@penny/shared-backend';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.login(user, response);
    response.status(HttpStatus.OK).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }
}
