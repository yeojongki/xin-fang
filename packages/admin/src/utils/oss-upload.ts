import request from '@/utils/request';
import { IOSSSignature } from '@xf/common/src/interfaces/oss-signature.interface';

export const getSignature = async (): Promise<IOSSSignature | null> => {
  try {
    const { result } = await request.get('/attachment/signature');
    return result;
  } catch (error) {
    return null;
  }
};
