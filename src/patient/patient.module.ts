import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Patient, ])],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
