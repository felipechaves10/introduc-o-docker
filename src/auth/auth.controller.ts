import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './DTO/resgiter.dto';
import { LoginDto } from './DTO/login.dto';

@Controller('auth')
    export class AuthController {
        constructor(private authService: AuthService) {}

        @Post('register')
        async register(@Body() userData: RegisterUserDto) {
            return this.authService.registerUser(userData);
        }

        @Post('login')
        async login(@Body() credentials: LoginDto) {
            return this.authService.login(credentials);
        }
    }
