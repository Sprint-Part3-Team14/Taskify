const ACCESS_TOKEN = 'accessToken';

export const setAccessToken = (value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TOKEN, value);
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ACCESS_TOKEN);
  }
};

export const removeAccessToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN);
  }
};
