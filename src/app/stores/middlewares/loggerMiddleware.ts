import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

// Tạo middleware với kiểu mạnh
const loggerMiddleware: Middleware =
  (store: MiddlewareAPI) => (next) => (action) => {
    console.log('Dispatching:', action);
    console.log('Previous state:', store.getState());

    const result = next(action); // Tiếp tục với middleware/reducer tiếp theo

    console.log('Next state:', store.getState());
    return result;
  };

export default loggerMiddleware;
