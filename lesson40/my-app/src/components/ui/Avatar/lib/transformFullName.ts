export const transformFullName = (fullName: string): string => {
  if (!fullName) {
    throw new Error("FullName не задан");
  }

  const fullNameWords = fullName.split(" ");

  if (fullNameWords.length !== 2) {
    throw new Error("Длина FullName должна быть равна 2");
  }

  return fullNameWords.map((item) => item[0].toUpperCase()).join("");
};
