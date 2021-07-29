class Suma {
  private numA: number; 
  private numB: number;

  constructor(numA: number, numB: number) {
    this.numA = numA;
    this.numB = numB;
  };

  resultado() {
    return this.numA + this.numB;
  };
};

module.exports = Suma;