import { Injectable } from '@nestjs/common';
import { decode, encode } from '@/utils/encode-decode';

@Injectable()
export class EmailService {
  verify(addr: string) {
    const encodeData = encode(addr);
    console.log('src', addr);
    console.log('encodeData', encodeData);
    const decodeData = decode(encodeData);
    console.log('decodeData', decodeData);
    return {
      addr,
      encodeData,
      decodeData,
    };
  }
}
