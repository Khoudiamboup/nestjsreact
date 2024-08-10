import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RendezVous } from '../rendezvous/rendezvous.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  age: number;

  @Column()
  addresse: string;

  @Column()
  telephone: string;


  @OneToMany(() => RendezVous, rendezvous => rendezvous.patient)
  rendezvous: RendezVous[];
}
