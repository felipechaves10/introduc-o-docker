import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './DTO/resgiter.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './DTO/login.dto';
import { use } from 'passport';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(
        private jwt: JwtService, 
        private prisma: PrismaService
    ){}

    async registerUser(userData: RegisterUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: {email: userData.email}
        })

        if(userExists){
            throw new ConflictException("Email já está em uso!")
        }

        const hashedPassword = await bcrypt.hash(
            userData.senha, 10)


        const newUser = await this.prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                senha: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })
        
        return newUser;
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({where:{email}})
        if(!user) throw new UnauthorizedException('Credenciais Inválidas!')

        if(!user.senha) throw new UnauthorizedException(
            'Usuário não possui senha definida (Logar com o Google)'
        )

        const isMatch = await bcrypt.compare(password, user.senha)
        if(!isMatch) throw new UnauthorizedException('Credenciais Inválidas!')

        return user;
    }

    async login(credentials: LoginDto) {
        const user = await this.validateUser(
            credentials.email,
            credentials.senha
        )         
        
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role
        }

        return {
            access_token: this.jwt.sign(payload)
        }

    }

}