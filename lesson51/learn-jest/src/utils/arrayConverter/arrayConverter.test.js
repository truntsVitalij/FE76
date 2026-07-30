const arrayConverter = require("./arrayConverter");

describe("Проверка работоспособности функции arrayConverter", () => {
  beforeAll(() => {}); // вызывается перед всеми тестами 1 раз
  beforeEach(() => {}); // вызывается перед каждым тестом

  test("ответ функции с корректным массивом", () => {
    expect(arrayConverter(["1", "2", "3", "4", "5"])).toEqual([1, 2, 3, 4, 5]);
  });

  test("ответ функции с некорректным массивом", () => {
    expect(() => arrayConverter(["1", "2", "3", "4", "5", 6])).toThrow(
      "Array contains non-string elements",
    );
  });

  test("ответ функции с массивом из некорректных строк", () => {
    expect(
      arrayConverter(["1", "2", "3", "4", "5", "0", "asfasfasf", "asfasf"]),
    ).toEqual([1, 2, 3, 4, 5]);
  });

  afterEach(() => {}); // вызывается после каждого теста
  afterAll(() => {}); // вызывается после всех тестов 1 раз
});
