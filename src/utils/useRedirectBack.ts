import { useNavigate } from "react-router-dom";

export const useRedirectBack = () => {
  const navigation = useNavigate();
  return () => {
    navigation(-1);
  };
};
