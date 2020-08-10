import axios from 'axios';
import { Request } from './typings';
import { baseUrl } from './constants';

const api = axios.create({
  baseURL: baseUrl,
});

const requestApi: Request = async (method, path, data) => {
  const params: (string | Record<string, any>)[] = [path];
  if (data) params.push(data);

  try {
    // @ts-ignore
    const response = await api[method](...params);

    return {
      data: response.data,
    };
  } catch (error) {
    if (error.response?.data) {
      return { error: error.response?.data };
    }
    throw error;
  }
};

export default requestApi;
