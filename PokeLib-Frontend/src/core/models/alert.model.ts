export class Alert {
  public id: string;
  public message: string;
  public title: string;
  public type: TypeAlert;
  public showtime: number;

  constructor(id: string, message: string, title: string, type: TypeAlert, showTime: number) {
    this.id = id;
    this.message = message;
    this.title = title;
    this.type = type;
    this.showtime = showTime;
  }
}

export type TypeAlert = 'error' | 'success' | 'warning';
