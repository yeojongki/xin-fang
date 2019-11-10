import request from '@/utils/request';

export const getSignature = () => request.get('/attachment/signature');

export const uploadFile = ({ file }: { file: File }) => request.post('/attachment', { data: file });
