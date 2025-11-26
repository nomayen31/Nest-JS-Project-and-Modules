import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Nest JS Project !';
  }
  postHello(): string {
    return 'Nest JS Project !';
  }
}
