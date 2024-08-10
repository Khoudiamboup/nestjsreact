import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MedecinService } from './medecin.service';
import { CreateMedecinDto } from '../dtos/create-medecin.dto';
import { UpdateMedecinDto } from '../dtos/update-medecin.dto';

@Controller('medecin')
export class MedecinController {
  constructor(private readonly medecinService: MedecinService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMedecinDto: CreateMedecinDto) {
    return this.medecinService.create(createMedecinDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.medecinService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    const idNum = +id;
    if (isNaN(idNum)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.medecinService.findOne(idNum);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMedecinDto: UpdateMedecinDto) {
    const idNum = +id;
    if (isNaN(idNum)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.medecinService.update(idNum, updateMedecinDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    const idNum = +id;
    if (isNaN(idNum)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.medecinService.remove(idNum);
  }
}
