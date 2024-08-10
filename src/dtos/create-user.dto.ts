export class CreateUserDto {
  readonly nom: string;
  readonly prenom: string;
  readonly email: string;
  readonly password: string;
  readonly googleId?: string; 
}
