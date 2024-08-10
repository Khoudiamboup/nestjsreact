import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedecinController } from './medecin.controller';
import { MedecinService } from './medecin.service';
import { Medecin } from './medecin.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Medecin]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [MedecinController],
  providers: [MedecinService, JwtAuthGuard],
  exports: [MedecinService],
})
export class MedecinModule {}
