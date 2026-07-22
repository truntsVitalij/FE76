import { useLocalStorage } from "./use-local-storage";

const IS_LOGIN_KEY = "isLogin";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    fetch().then((value) => {
      setIsLogin(value);
    });
  }, []);

  return isLogin;
};
