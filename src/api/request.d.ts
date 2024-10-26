interface vResponseData<T = any> {
  code: number;
  msg: string;
  data?: T;
}

interface vUserLoginData {
  username: string;
  password: string;
}
