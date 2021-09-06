// https://stackoverflow.com/questions/8495687/split-array-into-chunks

export const chunk = (array, chunkSize) => {
  const arr = [];
  for (let i = 0; i < array.length; i += chunkSize)
    arr.push(array.slice(i, i + chunkSize));
  return arr;
};
