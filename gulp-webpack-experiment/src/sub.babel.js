class Subtractor {
  constructor(a) {
    this.a = a;
  }

  subtract(b) {
    return this.a - b;
  }
};

export default function sub(a, b) {
  return ((x, y) => new Subtractor(x).subtract(y))(a, b);
};
