const arrayConverter = (array) => {
  if (array.some((item) => typeof item !== "string")) {
    throw new Error("Array contains non-string elements");
  }

  return array.map((item) => Number(item)).filter((item) => Boolean(item));
};

module.exports = arrayConverter;

// falsy values: 0, '', null, undefined, NaN
