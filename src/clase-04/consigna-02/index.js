const { Observable } = rxjs;
const { map } = rxjs.operators;

const input = document.querySelector('input');
const log = document.querySelector('label');

const fromEvent = (node, name) => new Observable((observer) => {
  const handler = (event) => {
    const text = event.target.value;
    if (text === "complete") observer.complete();
    if (text === "error") observer.error("Fin por error.");
    observer.next(text);
  }
  node.addEventListener(name, handler);
  return () => {
    node.removeEventListener(name, handler);
  };
});

const observable = fromEvent(input, "input").pipe(
  map(text => {
    return [...text].reverse().join("");;
  })
);

const clearData = () => {
  input.disabled = true;
  input.value = '';
  log.textContent = '';
};

const observer = {
  next: (text) => {
    log.textContent = text;
  },
  error: (error) => {
    console.log(error);
    clearData();
  },
  complete: () => {
    console.log("Fin por complete.");
    clearData();
  },
};

const suscriptor = observable.subscribe(observer);

setTimeout(() => {
  suscriptor.unsubscribe();
  clearData();  
}, 30*1000);