exports.format = (data, success) => {
  if (success) {
    return {
      data: data,
      success: true,
    };
  } else {
    return {
      error: data,
      success: false,
    };
  }
};
