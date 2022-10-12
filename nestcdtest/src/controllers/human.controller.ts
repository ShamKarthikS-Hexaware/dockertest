import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { humanDto } from '../dto/human-dto.dto';
import { humanService } from '../services/human.service';


@Controller('human')
export class humanController {
    constructor(private readonly humanService: humanService) { }

    @Post()
    async create(@Body() humanDto: humanDto) {
        const res = this.humanService.create(humanDto);
        return res;
    }

    @Get()
    async findAll() {
        return this.humanService.findAll();
    }

    @Post('/:id')
    update(@Param('id') id: string, @Body() humanDto: humanDto) {
        return this.humanService.update(id, humanDto);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.humanService.delete(id);
    }
}