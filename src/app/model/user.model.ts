export class UserModel {
  uid: string;
  roleId: number;
  name: string;
  email: string;
  createDate: number;
  status: string;

  constructor(params: UserModel) {
    Object.assign(this as UserModel, params);
  }

  static empty() {
    return new UserModel({
      uid: '',
      roleId: null,
      name: '',
      email: '',
      createDate: new Date().getTime(),
      status: 'active',
    });
  }
 
}
