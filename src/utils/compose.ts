const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) => {
  return fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);
};

export default compose;
