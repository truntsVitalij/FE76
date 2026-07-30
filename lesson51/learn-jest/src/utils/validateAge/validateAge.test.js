const validateAge = require("./validateAge");

describe("Проверка работоспособности функции validateAge", () => {
  test("ответ функции с валидным значением возраста", () => {
    expect(validateAge(19)).toBe(true);
  });

  test("ответ функции с некорректным значением возраста", () => {
    expect(validateAge(17)).toBe(false);
    expect(validateAge(61)).toBe(false);
  });

  test("ответ функции с переданным возрастом в виде корректной строки", () => {
    expect(validateAge("19")).toBe(true);
  });

  test("ответ функции с переданным возрастом в виде некорректной строки", () => {
    expect(validateAge("afsaf")).toBe(false);
  });
});
