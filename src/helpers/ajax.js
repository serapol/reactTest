import React from 'react';
import axios from 'axios';

const request = (url, options = {}) => {
  let headers = {...options.headers};

  if (options.jwt) {
    headers['Authorization'] = options.jwt;
  }

  return axios(url, {
    ...options,
    headers
  })
  .then((response) => {
    const { data } = response;

    if (data.error) {
      return Promise.reject(data.error);
    }

    return Promise.resolve(data);
  })
  .catch((error) => {
    console.error(error);
    return Promise.reject(error);
  });
};

export const get = (url, options) => {
  return request(url, {
    method: 'GET',
    ...options
  });
};

export const post = (url, options) => {
  return request(url, {
    method: 'POST',
    ...options
  });
};

export const del = (url, options) => {
  return request(url, {
    method: 'DELETE',
    ...options
  });
};
