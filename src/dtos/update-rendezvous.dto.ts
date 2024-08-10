import { PartialType } from '@nestjs/mapped-types';
import { CreateRendezVousDto } from './create-rendezvous.dto';

export class UpdateRendezVousDto extends PartialType(CreateRendezVousDto) {}
