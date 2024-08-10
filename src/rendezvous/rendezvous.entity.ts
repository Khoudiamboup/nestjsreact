import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Medecin } from '../medecin/medecin.entity';

@Entity()
export class RendezVous {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  avecqui: string;

  @Column()
  date: Date;

  @Column()
  heure: string;

  @Column()
  lieu: string;

  @ManyToOne(() => Patient, patient => patient.rendezvous)
  patient: Patient;

  @ManyToOne(() => Medecin, medecin => medecin.rendezVous)
  medecin: Medecin;
}
