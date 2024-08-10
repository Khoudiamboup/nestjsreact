import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { RendezVousService } from './rendezvous.service';
import { CreateRendezVousDto } from '../dtos/create-rendezvous.dto';
import { UpdateRendezVousDto } from '../dtos/update-rendezvous.dto';

@Controller('rendezvous')
export class RendezvousController {
  constructor(private readonly rendezvousService: RendezVousService) {}

  @Post()
  create(@Body() createRendezVousDto: CreateRendezVousDto) {
    return this.rendezvousService.create(createRendezVousDto);
  }

  @Get()
  async findAll() {
    return this.rendezvousService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rendezvousService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRendezVousDto: UpdateRendezVousDto) {
    return this.rendezvousService.update(id, updateRendezVousDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.rendezvousService.remove(id);
  }
}
