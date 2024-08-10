import { IsString, IsDate, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRendezVousDto {
  @IsString()
  titre: string;

  @IsString()
  avecqui: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  heure: string;

  @IsString()
  lieu: string;

  @IsOptional()
  @IsInt()
  medecinId?: number;
}
