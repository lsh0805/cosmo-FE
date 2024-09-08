import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface IRegisterData {
  userEmail: string;
  userId: string;
  userName: string;
  password: string;
}

interface IRegisterContextDefault {
  registerData: IRegisterData;
  setRegisterData: Dispatch<SetStateAction<IRegisterData>>;
}

const RegisterContext = createContext<IRegisterContextDefault>({
  registerData: {
    userEmail: "",
    userId: "",
    userName: "",
    password: "",
  },
  setRegisterData: () => {},
});

interface RegisterProviderProps {
  children?: ReactNode;
}

export const RegisterProvider: React.FC<RegisterProviderProps> = ({
  children,
}) => {
  const [registerData, setRegisterData] = useState<IRegisterData>({
    userEmail: "",
    userId: "",
    userName: "",
    password: "",
  });

  return (
    <RegisterContext.Provider value={{ registerData, setRegisterData }}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContext;
