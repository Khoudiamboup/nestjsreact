import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RendezVous } from '../rendezvous/rendezvous.entity';

@Entity()
export class Medecin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  docteur: string;

  @Column()
  spécialité: string;

  @Column()
  adresse: string;

  @Column()
  téléphone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => RendezVous, rendezVous => rendezVous.medecin)
  rendezVous: RendezVous[];
}
