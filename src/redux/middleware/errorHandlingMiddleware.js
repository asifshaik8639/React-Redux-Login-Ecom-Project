// errorHandlingMiddleware.js
const errorHandlingMiddleware = (store) => (next) => (action) => {
    try {
      console.log('Action in errorHandlingMiddleware:', action);
      return next(action);
    } catch (error) {
      console.error('Error in errorHandlingMiddleware:', error);
    }
  };
  
  export default errorHandlingMiddleware;
  