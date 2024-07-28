import { UsersService } from '@/users/users.service';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import * as argon from 'argon2';
import { LoginDTO } from './dto/login.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }


    public async login(loginDto: LoginDTO) {
        const { email, password } = loginDto;

        const user = await this.validateUser(email, password);

        const token = await this.generateToken({ id: user.id, roles: user.roles });

        return {
            access_token: token,
        };
    }


    public async register(user: RegisterDTO) {


        const isExist = await this.userService.getByEmail(user.email);

        if (isExist) {
            throw new BadRequestException('User already exists!');
        }


        const hashedPassword = await argon.hash(user.password);

        await this.userService.create({
            ...user,
            password: hashedPassword,
        });

        return "User created successfully!";

    }

    public async getProfile(userId: string) {

        this.logger.debug(`User with id ${userId} is requesting profile`);

        const user = await this.userService.getById(userId);

        if (!user) {
            throw new BadRequestException('There is no user with this credentials!');
        }

        return user
    }


    async validateUser(email: string, pass: string) {

        const user = await this.userService.getByEmail(email);

        if (!user) {
            throw new BadRequestException('There is no user with this credentials!');
        }

        const passMatch = await this.comparePassword(pass, user.password);

        if (!passMatch) {
            throw new BadRequestException('There is no user with this credentials!');
        }

        return user;
    }

    async validateToken(token: string): Promise<any> {

        const decodedToken = await this.decodeToken(token);


        this.logger.debug(`Decoded token: ${JSON.stringify(decodedToken)}`);

        return decodedToken;
    }



    private comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return argon.verify(hashedPassword, plainTextPassword);
    }

    private async generateToken(payload: any): Promise<string> {
        const accessTokenOptions = {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: '2d',
        }

        const token = await this.jwtService.signAsync(payload, accessTokenOptions);

        return token;
    }

    private async decodeToken(token: string): Promise<any> {
        const decodedToken = await this.jwtService.decode(token);

        return decodedToken;
    }


    private async verifyToken(token: string): Promise<any> {
        const verifiedToken = await this.jwtService.verify(token);

        return verifiedToken;
    }


}
