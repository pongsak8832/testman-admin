export class OrganizationModel {
  id: string;
  name: string;
  member: string;
  status: string;
  createDate: number;

  constructor(params: OrganizationModel) {
    Object.assign(this as OrganizationModel, params);
  }

  static empty() {
    return new OrganizationModel({
      id: '',
      name: '',
      member: '',
      status: 'active',
      createDate: new Date().getTime()
    });
  }
 
}
