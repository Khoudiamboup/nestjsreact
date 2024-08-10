import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RendezVous } from './rendezvous.entity';
import { RendezVousService } from './rendezvous.service';
import { RendezvousController } from './rendezvous.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RendezVous])],
  controllers: [RendezvousController],
  providers: [RendezVousService],
  exports: [RendezVousService], 
})
export class RendezvousModule {}
