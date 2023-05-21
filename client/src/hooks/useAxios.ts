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
    ['X-Total-Count']?: string;
  };
}) => {
  response: any;
  isLoading: boolean;
  error: any;
  setResponse: (response: any) => void;
} = (axiosParams: {
  method: string;
  url: string | null;
  data?: any;
  headers?: {
    Authorization?: string;
    ['Content-Type']?: string;
    ['X-Total-Count']?: string;
  };
}) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentRequest, setCurrentRequest] = useState('');

  useEffect(() => {
    const fetchData = async (params: any) => {
      try {
        setIsLoading(true);
        const result = await axios.request(params);
        setResponse(result.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (axiosParams.url && axiosParams.url !== currentRequest) {
      setCurrentRequest(axiosParams.url);
      fetchData(axiosParams);
    }
  }, [axiosParams.url, currentRequest]);

  return { response, error, isLoading, setResponse };
};
