import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface IRegisterData {
  phoneNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  password: string;
}

interface IRegisterContextDefault {
  registerData: IRegisterData;
  setRegisterData: Dispatch<SetStateAction<IRegisterData>>;
}

const RegisterContext = createContext<IRegisterContextDefault>({
  registerData: {
    phoneNumber: "",
    userId: "",
    userName: "",
    userEmail: "",
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
    phoneNumber: "",
    userId: "",
    userName: "",
    userEmail: "",
    password: "",
  });

  return (
    <RegisterContext.Provider value={{ registerData, setRegisterData }}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContext;
