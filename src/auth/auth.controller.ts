import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './decorators/user.decorator';
import { CustomAuthGuard } from './guards/auth.guard';

@Controller({
    path: 'auth',
    version: ["1"],
})
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body() loginDTO: LoginDTO,
    ) {
        return this.authService.login(loginDTO);
    }


    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(
        @Body() registerDTO: RegisterDTO,
    ) {
        console.log("user", registerDTO);
        return this.authService.register(registerDTO);
    }

    @UseGuards(CustomAuthGuard)
    @Get('profile')
    getProfile(@User("id") userId: string) {

        return this.authService.getProfile(userId);
    }
}
