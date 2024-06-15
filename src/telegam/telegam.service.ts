import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class TelegamService {
  constructor(private readonly httpService: HttpService) {}

  async checkToken(token: string) {
    try {
      const data = await lastValueFrom(
        this.httpService
          .get(`https://api.telegram.org/bot${token}/getMe`)
          .pipe(map((res) => res.data)),
      );

      return data?.ok;
    } catch (e) {
      return false;
    }
  }
}
