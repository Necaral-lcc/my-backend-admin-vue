export const getRoute = (num: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(`Route ${num}`);
    }, 300);
  });

export const login = (num: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num);
    }, 1000 * num);
  });
};
