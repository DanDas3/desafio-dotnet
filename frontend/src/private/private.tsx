import { useContext } from "react";
import { AuthContext, GlobalContent } from "../context/authContext";
import Login from "../pages/Login/Login";
import { PropsChildrenComponent } from "../types/types";

const Private = ( { children }: PropsChildrenComponent) => {
  const { authenticated } = useContext<GlobalContent>(AuthContext);

  if (!authenticated) {
    return <Login/>;
  }
  return <>{children}</>;
};

export default Private;