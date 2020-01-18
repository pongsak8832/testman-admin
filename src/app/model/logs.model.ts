export class LogsModel {
  id: string;
  createBy: string;
  action: string;
  // description : string `ยังไม่ได้ใช้`
  refId: string;
  refCollection: string;
  data: string;
  dateTime: number;

  constructor(params: LogsModel) {
    Object.assign(this as LogsModel, params);
  }

  static empty() {
    return new LogsModel({
      id: '',
      createBy: '',
      action: '',
      refId: '',
      refCollection: '',
      data: '',
      dateTime: NaN,
    });
  }

}
