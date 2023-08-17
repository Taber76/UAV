import { UserService } from './user.service';
import { UserData, UserLog } from 'src/types/user.types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(data: UserData): Promise<any>;
    login(data: UserLog): Promise<any>;
}
