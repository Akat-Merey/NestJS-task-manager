import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [];
    private idCounter = 1;

    create (username: string, email: string, password: string): User {
        const user: User = { 
            id: this.idCounter++,
            username,
            email,
            password,
        };
        this.users.push(user)
        return user;
    }

    findByEmail(email: string): User | undefined {
        return this.users.find((user) => user.email === email);
    }

    findById(id: number): User | undefined {
        return this.users.find((user) => user.id === id);
    }
}