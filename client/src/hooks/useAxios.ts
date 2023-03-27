import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_HOSTNAME}/api`;

export const useAxios: (axiosParams: {
  method: string;
  url: string;
  data?: any;
  headers?: {
    Authorization?: string;
    ['Content-Type']?: string;
  };
}) => { response: any; isLoading: boolean; error: any } = (axiosParams: {
  method: string;
  url: string;
  data?: any;
  headers?: {
    Authorization?: string;
    ['Content-Type']?: string;
  };
}) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (params: any) => {
      try {
        const result = await axios.request(params);
        setResponse(result.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(axiosParams);
  }, []);

  return { response, error, isLoading };
};
