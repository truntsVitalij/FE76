const delay = require("./delay");

describe("Проверка работоспособности функции delay", () => {
  test("ответ функции с корректными аргументами", () => {
    expect(delay()).resolves.toBe(true);
  });

  test("ответ функции с корректными аргументами (async/await)", async () => {
    const result = await delay();

    expect(result).toBe(true);
  });
});
