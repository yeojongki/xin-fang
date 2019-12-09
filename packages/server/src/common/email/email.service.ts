import { Injectable } from '@nestjs/common';
import { decode, encode } from '@/utils/encode-decode';

@Injectable()
export class EmailService {
  verify(id, encodeEmail: string) {
    return {
      id,
      email: decode(encodeEmail),
    };
  }

  genarateVerifyCode(id: string, email: string) {
    return `${id},${encode(`${email}`)}`;
  }
}
