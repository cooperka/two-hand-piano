export const env = {
  IS_STATIC: typeof document === 'undefined',
};

export const api = {
  // With no trailing slash.
  SITE_ROOT: 'https://piano.cooperka.com',
  // With lead slash if present; no trailing slash.
  BASE_PATH: '',
};
