import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { UsersService } from './users.service';

interface AuthenticatedRequest extends Request {
  user: { userId: string; email: string };
}

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async me(@Req() req: AuthenticatedRequest) {
    const user = await this.usersService.findById(req.user.userId);
    return { id: user.id, email: user.email, name: user.name };
  }
}
