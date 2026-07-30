const sum = require("./sum");

test("проверка сложения двух простых чисел с помощью функции sum", () => {
  expect(sum(1, 2)).toBe(3);
});
