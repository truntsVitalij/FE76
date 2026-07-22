export const useLocalStorage = () => {
  const getItem = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      showNotification("Нет такого ключа в LS");
    }
  };

  const setItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      showNotification("Не удалось установить значение в LS");
    }
  };

  return { getItem, setItem };
};
