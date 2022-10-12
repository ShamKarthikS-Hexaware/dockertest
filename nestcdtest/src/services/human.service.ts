import { Injectable } from '@nestjs/common';
import { humanRepo } from '../repository/human.repo';
import { human } from '../schemas/human.schema';

@Injectable()
export class humanService {
    constructor(
        private readonly humanRepo: humanRepo
    ) { }

    async findAll(): Promise<human[]> {
        return this.humanRepo.findAll();
    }

    async create(data): Promise<human> {
        data.createddate = new Date();
        return this.humanRepo.create(data);
    }

    async update(humanId, data): Promise<human> {
        return this.humanRepo.update(humanId, data);
    }

    async delete(humanId): Promise<human> {
        return this.humanRepo.delete(humanId);
    }
}