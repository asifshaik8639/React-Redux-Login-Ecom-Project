// authenticationMiddleware.js
const authenticationMiddleware = (store) => (next) => (action) => {
    if (action.type === 'LOGGED_IN') {
      // Perform authentication logic here
      console.log('User Logged In!');
    }
    return next(action);
  };
  
  export default authenticationMiddleware;
  