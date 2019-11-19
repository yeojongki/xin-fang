export interface IOSSSignature {
  policy: string;
  OSSAccessKeyId: string;
  signature: string;
  expiration: string;
  host: string;
  dir: string;
  callback: string;
}

export interface IOSSCallback {
  filename: string;
  bucket: string;
  size: string;
  width: string;
  height: string;
  mimeType: string;
  format: string;
}
