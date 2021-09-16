exports.format = (data, success) => {
  if (success) {
    return {
      data: data,
      success: success,
    };
  }
  return {
    errors: data,
    success: success,
  };
};
