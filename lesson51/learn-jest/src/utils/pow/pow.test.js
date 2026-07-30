const pow = require("./pow");

describe("Проверка работоспособности функции pow", () => {
  let mockedMathPow;
  beforeEach(() => {
    mockedMathPow = jest.spyOn(Math, "pow");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("ответ функции с корректными аргументами", () => {
    expect(pow(2, 2)).toBe(4);
    expect(mockedMathPow).toHaveBeenCalledTimes(1);
  });

  test("ответ функции с аргументом 1", () => {
    expect(pow(1, 2)).toBe(1);
    expect(mockedMathPow).toHaveBeenCalledTimes(0);
  });
});
