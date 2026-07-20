import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { DEFAULT_ENGLISH_TRANSLATIONS } from './default-translations';

@Injectable()
export class LanguagesService implements OnModuleInit {
  constructor(
    @InjectRepository(Language) private languagesRepo: Repository<Language>,
  ) {}

  async onModuleInit() {
    const existing = await this.languagesRepo.findOne({ where: { code: 'en' } });
    if (!existing) {
      await this.languagesRepo.save(
        this.languagesRepo.create({
          code: 'en',
          name: 'English',
          isDefault: true,
          translations: DEFAULT_ENGLISH_TRANSLATIONS,
        }),
      );
    }
  }

  findAll() {
    return this.languagesRepo.find({
      select: { id: true, code: true, name: true, isDefault: true },
      order: { name: 'ASC' },
    });
  }

  async findByCode(code: string) {
    const language = await this.languagesRepo.findOne({ where: { code } });
    if (!language) throw new NotFoundException(`Language "${code}" not found`);
    return language;
  }

  async getTemplate() {
    const defaultLanguage = await this.languagesRepo.findOne({ where: { isDefault: true } });
    if (!defaultLanguage) throw new NotFoundException('Default language not configured');
    return defaultLanguage.translations;
  }

  async create(dto: CreateLanguageDto) {
    const existing = await this.languagesRepo.findOne({ where: { code: dto.code } });
    if (existing) throw new ConflictException(`Language "${dto.code}" already exists`);

    const language = this.languagesRepo.create({
      code: dto.code,
      name: dto.name,
      translations: dto.translations,
    });
    return this.languagesRepo.save(language);
  }
}
