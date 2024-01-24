/*/api/users/register*/
export interface RegisterPropertyUser {
  email: string;
  name: string;
  lastname: string;
  password: string;
  phone: string;
}

export interface PropertyUser {
  userId: string;
  companyId: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  emailConfirmed: true;
  accountActivated: true;
  propertyAccess: PropertyAccess[];
}

export interface PropertyAccess {
  propertyId: string;
  permission: string;
}

/*/api/users/login*/
export interface LoginPropertyUser {
  email: string;
  password: string;
}

export interface PropertyUserSession {
  sessionToken: string;
  userData: UserData;
}

export interface UserData {
  userId: string;
  companyId: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  emailConfirmed: true;
  accountActivated: true;
  propertyAccess: PropertyAccess[];
  language: string;
}
