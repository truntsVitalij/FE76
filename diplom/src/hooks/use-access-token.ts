const ACCESS_TOKEN = "access_token";

export const useAccessToken = () => {
  let accessToken = null;
  try {
    accessToken = localStorage.getItem(ACCESS_TOKEN);
  } catch (e) {
    console.error("Не получилось вытянуть токен из LS", e);
  }

  return accessToken;
};
