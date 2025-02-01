import { useNavigate } from "react-router-dom";

export const useRedirectHome = () => {
  const navigation = useNavigate();
  return () => {
    navigation("/");
  };
};
