const showWords = (text: string, fn: (quantityWords: number) => string, ms?: number) => {
  const textWords = text.split(" ");
  let index = 0;
  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      console.log(textWords[index]);
      index++;
      if (index === textWords.length) {
        clearInterval(intervalId);
        resolve(console.log(fn(index)))
      }
    }, ms ?? 1000);
  });
};

const notify = (quantityWords: number) => 
  `Proceso completo. Cantidad total de palabras: ${quantityWords}`;

const initiation = async () => {
  await showWords("Say my name", notify, 500);
  await showWords("Not today", notify, 1500);
  await showWords("May the force be with you", notify);
};

initiation();