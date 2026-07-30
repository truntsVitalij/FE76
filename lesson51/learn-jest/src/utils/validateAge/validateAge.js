const validateAge = (age) => {
  if (Number.isNaN(Number(age))) {
    return false;
  }

  if (Number(age) < 18 || Number(age) > 60) {
    return false;
  }

  return true;
};

module.exports = validateAge;
