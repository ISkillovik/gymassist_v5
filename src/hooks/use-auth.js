import { useSelector } from "react-redux";

const useAuth = () => {
  //const { email, token, id } = useSelector((state) => state.user.currentUser);
  const user = useSelector((state) => state.user.currentUser);
  //console.log(user, user.email);
  return {
    isAuth: !!user,
    // email,
    // token,
    // id,
  };
};

export default useAuth;
