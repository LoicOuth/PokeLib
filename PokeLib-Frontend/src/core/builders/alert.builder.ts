import guidUtil from '@/utils/guid.util';
import { Alert } from '../models/alert.model';

const DEFAULT_SHOW_TIME = 5000;

export class AlertBuilder {
  protected message: string;
  protected title!: string;
  protected isSuccess!: boolean;
  protected showtime!: number;

  constructor(message: string) {
    this.message = message;
  }

  setTitle = (title: string): AlertBuilder => {
    this.title = title;
    return this;
  };

  private setIsSuccess = (isSuccess: boolean): AlertBuilder => {
    this.isSuccess = isSuccess;
    return this;
  };

  private setShowTime = (showTime: number): AlertBuilder => {
    this.showtime = showTime;
    return this;
  };

  private build = (): Alert =>
    new Alert(guidUtil().generate(), this.message, this.title, this.isSuccess, this.showtime);

  buildSuccess(): Alert {
    this.setIsSuccess(true);
    this.setShowTime(DEFAULT_SHOW_TIME);

    if (!this.title) {
      this.setTitle('Success');
    }

    return this.build();
  }

  buildError(): Alert {
    this.setIsSuccess(false);
    this.setShowTime(DEFAULT_SHOW_TIME);

    if (!this.title) {
      this.setTitle('Error');
    }

    return this.build();
  }
}
