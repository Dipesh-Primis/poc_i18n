import { IsObject, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  @Matches(/^[a-z]{2,3}(-[A-Z]{2})?$/, {
    message: 'code must be a valid locale code, e.g. "fr" or "pt-BR"',
  })
  code: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsObject()
  translations: Record<string, string>;
}
