const asyncWrap = (fn) =>
  function asyncWrapper(...args) {
    console.log(...args);
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

module.exports = asyncWrap;
