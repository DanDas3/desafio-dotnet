import { createContext, useState } from "react";
import { PropsChildrenComponent } from "../types/types";

export type UtilsContent = {
  drawerStatus: boolean;
  ChangeDrawerStatus: (status: boolean) => void;
};

export const UtilsContext = createContext<UtilsContent>({
  drawerStatus: false,
  ChangeDrawerStatus: () => {},
});

export const UtilsProvider = ({ children }: PropsChildrenComponent) => {
  const [drawerStatus, setDrawerStatus] = useState<boolean>(true);

  const ChangeDrawerStatus = (status: boolean) => {
    setDrawerStatus(status);
  };

  return (
    <UtilsContext.Provider value={{ drawerStatus, ChangeDrawerStatus }}>
      {children}
    </UtilsContext.Provider>
  );
};