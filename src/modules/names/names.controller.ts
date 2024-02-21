import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { NamesService } from './names.service';

@Controller('api/v1/names')
export class NamesController {
  constructor(private namesService: NamesService) {}

  @Get()
  async getNames(@Query('startsWith') startsWith?: string) {
    return this.namesService.getNames(startsWith);
  }

  @Post()
  async createName(@Body() data: { name: string }) {
    return this.namesService.createName(data.name);
  }

  @Put('/:currentName/:newName')
  async updateNameByURLParams(
    @Param('currentName') currentName: string,
    @Param('newName') newName: string,
  ) {
    return this.namesService.updateName(currentName, newName);
  }

  @Put()
  async updateNameBy(@Body() data: { currentName: string; newName }) {
    return this.namesService.updateName(data.currentName, data.newName);
  }

  @Delete('clear')
  async clearNames() {
    return this.namesService.clearNames();
  }

  @Delete('/:name')
  async deleteName(@Param('name') name: string) {
    return this.namesService.deleteName(name);
  }
}
