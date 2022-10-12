import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { humanController } from '../controllers/human.controller';
import { humanService } from '../services/human.service';
import { humanRepo } from '../repository/human.repo';
import { human, humanSchema } from '../schemas/human.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: human.name, schema: humanSchema }])
    ],
    controllers: [humanController],
    providers: [humanService, humanRepo],
    exports: [humanService, humanRepo]
  })
  export class humanModule { }