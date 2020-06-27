export const environment = {
  production: true,
  authentication: {
    host: {
      login: 'http://localhost:5000/auth/login',
      verifyToken: 'http://localhost:5000/auth/verifyToken'
    }
  }
};
