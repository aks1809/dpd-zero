const sendHttpResponse = ({
  res,
  message,
  code,
  data = {},
  statusCode = 200,
  success = true,
}) => {
  if (success) {
    res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  } else {
    res.status(statusCode).json({
      status: 'error',
      code: code || 'INTERNAL_SERVER_ERROR',
      message:
        message || 'An internal server error occurred. Please try again later.',
    });
  }
};

export default sendHttpResponse;
