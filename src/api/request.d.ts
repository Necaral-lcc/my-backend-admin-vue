interface vResponseData<T = any> {
  code: number;
  message: string;
  data?: T;
}

interface vUserLoginData {
  email: string;
  password: string;
}
