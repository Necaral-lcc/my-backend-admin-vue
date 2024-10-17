export const getRoute = (num: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(`Route ${num}`);
    }, 300);
  });
