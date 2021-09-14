exports.format = (data, success) => {
  if (success) {
    return {
      data: data,
      success: success,
    };
  }
  return {
    error: data,
    success: success,
  };
};
