import { useAppSelector } from "./redux-hooks";

const useAuth = () => {
  //const { email, token, id } = useSelector((state) => state.user.currentUser);
  const user = useAppSelector((state) => state.user.currentUser);
  //console.log(user, user.email);
  return {
    isAuth: !!user,
    // email,
    // token,
    // id,
  };
};

export default useAuth;
