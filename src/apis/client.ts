import axios from 'axios';

import { URLS } from '@/constants';

export const client = axios.create({
  baseURL: URLS.PREFIX,
});
