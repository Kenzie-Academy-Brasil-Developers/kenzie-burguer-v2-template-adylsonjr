export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserWithToken {
  accessToken: string;
  user: IUser;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string
}

export interface ILoginFormValues {
  email: string;
  password: string;
}
