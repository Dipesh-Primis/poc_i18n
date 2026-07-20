import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';

@Controller('languages')
@UseGuards(AuthGuard('jwt'))
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @Get('template')
  async downloadTemplate(@Res() res: Response) {
    const translations = await this.languagesService.getTemplate();
    res.set('Content-Disposition', 'attachment; filename="translation-template.json"');
    res.json(translations);
  }

  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.languagesService.findByCode(code);
  }

  @Post()
  create(@Body() dto: CreateLanguageDto) {
    return this.languagesService.create(dto);
  }
}
