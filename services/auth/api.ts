import { ServerEnvUtil, ServerEnvKey } from '@/lib/serverEnv';

import axios from 'axios';

const authApi = () => {
  const apiClient = axios.create({
    baseURL: ServerEnvUtil.get(ServerEnvKey.CORE_AUTH_BASE_URL)
  });

  return {
    get: async (arg: { path: string, params?: Record<string, any> }) => {
      const { path, params } = arg;
      const response = await apiClient.get(path, { params });
      return response.data;
    },
    post: async (arg: { path: string, params?: Record<string, any>, data?: Record<string, any> }) => {
      const { path, params, data } = arg;
      const response = await apiClient.post(path, data, { params });
      return response.data;
    }
  }
};

export default authApi;
