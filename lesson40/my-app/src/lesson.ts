// function Client(name, age) {
//   //   let this = {};

//   this.name = name;
//   this.age = age;

//   //   return this;
// }

// const client = new Client("Vitalij", 28);

class Client {
  name = "";
  age = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const client = new Client("Vitalij", 29);
