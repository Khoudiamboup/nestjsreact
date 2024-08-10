import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedecinDto } from '../dtos/create-medecin.dto';
import { Medecin } from './medecin.entity';
import { UpdateMedecinDto } from '../dtos/update-medecin.dto';

@Injectable()
export class MedecinService {
  constructor(
    @InjectRepository(Medecin)
    private readonly medecinRepository: Repository<Medecin>,
  ) {}

  async create(createMedecinDto: CreateMedecinDto): Promise<Medecin> {
    const medecin = this.medecinRepository.create(createMedecinDto);
    return this.medecinRepository.save(medecin);
  }

  async findAll(): Promise<Medecin[]> {
    return this.medecinRepository.find();
  }

  async findOne(id: number): Promise<Medecin> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const medecin = await this.medecinRepository.findOneBy({ id });
    if (!medecin) {
      throw new NotFoundException('Medecin not found');
    }
    return medecin;
  }

  async update(id: number, updateMedecinDto: UpdateMedecinDto): Promise<Medecin> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const result = await this.medecinRepository.update(id, updateMedecinDto);
    if (result.affected === 0) {
      throw new NotFoundException('Medecin not found');
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const result = await this.medecinRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Medecin not found');
    }
  }
}
