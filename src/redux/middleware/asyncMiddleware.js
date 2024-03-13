// asyncMiddleware.js
const asyncMiddleware = (store) => (next) => async (action) => {
    if (action.type.endsWith('_REQUEST')) {
      // Perform asynchronous call logic here
      try {
        const result = await fetchData(); // Example asynchronous function
        store.dispatch({ type: 'API_SUCCESS', payload: result });
      } catch (error) {
        store.dispatch({ type: 'API_FAILURE', error: error.message });
      }
    }
    return next(action);
  };
  
  export default asyncMiddleware;
  