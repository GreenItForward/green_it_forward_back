import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class ControllersController {
    @Get()
    getHello(): { message: string } {
        return { message: 'Hello World!'};
    }
}
