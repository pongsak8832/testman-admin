export class ClientModel {
  uid: string;
  name: string;
  email: string;
  organizationId: string;
  status: string;

  constructor(params: ClientModel) {
    Object.assign(this as ClientModel, params);
  }

  static empty() {
    return new ClientModel({
      uid: '',
      name: '',
      email: '',
      organizationId: '',
      status: 'active',
    });
  }
 
}
