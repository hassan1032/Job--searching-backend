export const catchAsyncError = (function1) => {
  return (req, res, next) => {
    Promise.resolve(function1(req, res, next)).catch(next);
  };
};
