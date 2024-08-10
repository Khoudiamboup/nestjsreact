import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { PatientModule } from './patient/patient.module'; 
import { RendezvousModule } from './rendezvous/rendezvous.module';
import { Patient } from './patient/patient.entity';
import { RendezVous } from './rendezvous/rendezvous.entity';
import { MedecinModule } from './medecin/medecin.module';
import { Medecin } from './medecin/medecin.entity';
import { PassportModule } from '@nestjs/passport';
import { PatientController } from './patient/patient.controller';
import { RendezvousController } from './rendezvous/rendezvous.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';




@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Patient,RendezVous,Medecin,User],
      synchronize: true,

  
    }),
    PatientModule, 
    RendezvousModule,
    MedecinModule,
    PassportModule.register({ defaultStrategy: 'google', session: true }),
    AuthModule,
    UserModule,
    

  ],
  controllers: [AppController,PatientController,RendezvousController,UserController] ,
  providers: [AppService, DatabaseService,],
})
export class AppModule {
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService.testConnection();
  }
}