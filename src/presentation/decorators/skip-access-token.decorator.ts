import { SetMetadata } from '@nestjs/common';
export const SKIP_ACCESS_TOKEN = 'skipAccessToken';
export const SkipAccessToken = () => SetMetadata(SKIP_ACCESS_TOKEN, true);
