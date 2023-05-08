import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    getHello(): { message: string } {
        return { message: 'Hello World!'};
    }
}
