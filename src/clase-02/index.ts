const operacion = async (numA: number, numB: number, operacion: string) => {
  const { default: operacionAEjecutar } = await import(`./${operacion}`);
  const nuevaOperacion = new operacionAEjecutar(numA, numB);
  return new Promise(resolve => {
    resolve(nuevaOperacion.resultado());
  });
};

const operaciones = async () => {
  const resultado1 = await operacion(5, 2, 'resta');
  const resultado2 = await operacion(-5, 8, 'resta');
  const resultado3 = await operacion(-8, 3, 'suma');
  const resultado4 = await operacion(12, 96, 'suma');
  console.log(resultado1, resultado2, resultado3, resultado4);
};

operaciones();