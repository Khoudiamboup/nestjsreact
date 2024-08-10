import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RendezVous } from './rendezvous.entity';
import { CreateRendezVousDto } from '../dtos/create-rendezvous.dto';
import { UpdateRendezVousDto } from '../dtos/update-rendezvous.dto';

@Injectable()
export class RendezVousService {
  constructor(
    @InjectRepository(RendezVous)
    private readonly rendezvousRepository: Repository<RendezVous>,
  ) {}

  async create(rendezvous: CreateRendezVousDto): Promise<CreateRendezVousDto> {
    return await this.rendezvousRepository.save(rendezvous);
     }

  async findAll(): Promise<RendezVous[]> {
    return await this.rendezvousRepository.find();
  }

  async findOne(id: number): Promise<RendezVous> {
    return await this.rendezvousRepository.findOneBy({ id });
  }

  async update(id: number, updateRendezVousDto: UpdateRendezVousDto): Promise<RendezVous> {
    await this.rendezvousRepository.update(id, updateRendezVousDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.rendezvousRepository.delete(id);
  }
}
