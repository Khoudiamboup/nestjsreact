import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMedecinDto {
  @IsString()
  @IsNotEmpty()
  readonly docteur: string;

  @IsString()
  @IsNotEmpty()
  readonly Spécialité: string;

  @IsString()
  @IsNotEmpty()
  readonly adresse: string;

  @IsString()
  @IsNotEmpty()
  readonly téléphone: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;


  @IsString()
  @IsNotEmpty()
  readonly password: string;

  
 
}
