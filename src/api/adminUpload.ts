import { Axios } from 'src/api/Axios';

export type UploadScope = 'product' | 'review' | 'user';

export interface PresignUploadDto {
  scope: UploadScope;
  entityId: number | string;
  contentType: string; // image/jpeg | image/png | image/webp
}

export interface PresignUploadResponse {
  uploadUrl: string;
  key: string;
  fileUrl: string; // CloudFront URL
  expiresInSec: number;
}

export const presignUpload = async (dto: PresignUploadDto): Promise<PresignUploadResponse> => {
  const res = await Axios.post('/admin/upload/presign', dto);
  return res.data;
};

export const deleteS3Object = async (key: string): Promise<{ message: string; key: string }> => {
  const res = await Axios.delete('/admin/upload/s3-object', { params: { key } });
  return res.data;
};
