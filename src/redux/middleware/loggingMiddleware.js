// loggingMiddleware.js
const loggingMiddleware = (store) => (next) => (action) => {
    console.log('Action in loggingMiddleware:', action);
    const result = next(action);
    console.log('New State in loggingMiddleware:', store.getState());
    return result;
  };
  
  export default loggingMiddleware;
  