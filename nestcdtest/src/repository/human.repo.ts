import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { human, humanDocument } from 'src/schemas/human.schema';

@Injectable()
export class humanRepo {
    constructor(
        @InjectModel(human.name)
        private readonly humanModel: Model<humanDocument>) {}

    async create(data): Promise<human> {
        return new this.humanModel(data).save();
    }

    async findAll(): Promise<human[]> {
        return this.humanModel.find({})
            .exec();
    }

    async update(humanId, data): Promise<human> {
        const filter = { _id: humanId };
        return this.humanModel.findOneAndUpdate(filter, data);
    }

    async delete(humanId): Promise<human> {
        const filter = { _id: humanId };
        return this.humanModel.findByIdAndDelete(humanId);
    }
}