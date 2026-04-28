import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService { 
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(username: string, email: string, password: string) {
        const existing = this.usersService.findByEmail(email);
        if (existing) {
            throw new ConflictException('Email already in use');
        }
    
        const hashed = await bcrypt.hash(password, 10);
        const user = this.usersService.create(username, email, hashed);

        return { message: 'User registered succesfully', userId: user.id };
    }

    async login(email: string, password: string) {
        const user = this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credential');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { access_token: token };
    }

    



}