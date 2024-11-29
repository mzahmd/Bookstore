export interface ICustomer {
  id?: string;
  name?: string;
  email?: string;
  gender?: string;
  age?: number;
  password?: string;
}

export interface ICustomerToken {
  roles: string;
  username: string;
}
