 
// Timeout function
export function  wait(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("I promise to return after one second!");
    }, time);
  });
}


