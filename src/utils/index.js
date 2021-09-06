// https://stackoverflow.com/questions/8495687/split-array-into-chunks

export const chunk = (array, chunkSize) => {
  const arr = [];
  for (let i = 0; i < array.length; i += chunkSize)
    arr.push(array.slice(i, i + chunkSize));
  return arr;
};

export const randomString = (length = 7) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
