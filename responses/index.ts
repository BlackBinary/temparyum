export type successResponse = {
  status: 'success';
  data: object;
};

export type errorResponse = {
  status: 'error';
  error: string;
};

export const status = {
  SUCCESS: 200,
  ERROR: 400,
};

export const success = (data: object): successResponse => ({
  status: 'success',
  data,
});

export const error = (error: string): errorResponse => ({
  status: 'error',
  error,
});

export const parse = (response: successResponse | errorResponse) => {
  if (response.status === 'success') {
    return response.data;
  }

  throw new Error(response.error);
};

export const make = {
  success,
  error,
};

export default {
  status,
  parse,
  make,
};
