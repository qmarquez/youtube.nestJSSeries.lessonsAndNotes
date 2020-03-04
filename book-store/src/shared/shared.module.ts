import { Module } from '@nestjs/common';
import { MapperService } from './mapper.service';

@Module({
  imports: [MapperService],
  exports: [MapperService]
})
export class SharedModule {}
