export class Alert {
  public id: string;
  public message: string;
  public title: string;
  public isSuccess: boolean;
  public showtime: number;

  constructor(id: string, message: string, title: string, isSuccess: boolean, showTime: number) {
    this.id = id;
    this.message = message;
    this.title = title;
    this.isSuccess = isSuccess;
    this.showtime = showTime;
  }
}
