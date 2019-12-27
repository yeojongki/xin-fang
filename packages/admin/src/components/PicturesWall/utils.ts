import { IUploadFile } from '.';
import { UploadFile } from 'antd/lib/upload/interface';
import { OSS_PREFIX } from '@/config';

export const getUploadImgs = (imgs: IUploadFile[]): string[] =>
  imgs
    .map(img => {
      const { response } = img;
      if (response && typeof response !== 'string' && response.result.filename) {
        return response.result.filename;
      }
      return '';
    })
    .filter(Boolean);

/**
 * check fileList is string
 */
export const getFileList = (fileList?: string | UploadFile<any>[]): UploadFile<any>[] => {
  if (Array.isArray(fileList)) return fileList;
  let ret: UploadFile[] = [];
  if (typeof fileList === 'string') {
    ret = [
      {
        response: { result: { filename: fileList } },
        status: 'done',
        url: OSS_PREFIX + fileList,
        name: fileList,
        uid: fileList,
        size: 0,
        type: 'image',
      },
    ];
  }
  return ret;
};
