import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { CreatePatientDto } from 'src/dtos/create-patient.dto';
import { UpdatePatientDto } from 'src/dtos/update-patient.dto';


@Injectable()
export class PatientService {
  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOneBy({ id: Number(id) });
    if (!patient) {
      throw new Error('Patient not found');
    }

    patient.nom = updatePatientDto.nom;
    patient.prenom = updatePatientDto.prenom;
    patient.age = updatePatientDto.age;
    patient.addresse = updatePatientDto.addresse;
    patient.telephone = updatePatientDto.telephone;

    return await this.patientRepository.save(patient);
  }


  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient = this.patientRepository.create(createPatientDto);
    return await this.patientRepository.save(newPatient);
  }
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  findOne(id: string): Promise<Patient> {
    return this.patientRepository.findOneBy({ id: Number(id) });
  }

  async remove(id: string): Promise<void> {
    await this.patientRepository.delete(id);
  }
}



    

