import guidUtil from '@/utils/guid.util';
import { Alert, type TypeAlert } from '../models/alert.model';

const DEFAULT_SHOW_TIME = 5000;

export class AlertBuilder {
  protected message: string;
  protected title!: string;
  protected type!: TypeAlert;
  protected showtime!: number;

  constructor(message: string) {
    this.message = message;
  }

  setTitle = (title: string): AlertBuilder => {
    this.title = title;
    return this;
  };

  private setType = (type: TypeAlert): AlertBuilder => {
    this.type = type;
    return this;
  };

  private setShowTime = (showTime: number): AlertBuilder => {
    this.showtime = showTime;
    return this;
  };

  private build = (): Alert => new Alert(guidUtil().generate(), this.message, this.title, this.type, this.showtime);

  buildSuccess(): Alert {
    this.setType('success');
    this.setShowTime(DEFAULT_SHOW_TIME);

    if (!this.title) this.setTitle('Success');

    return this.build();
  }

  buildError(): Alert {
    this.setType('error');
    this.setShowTime(DEFAULT_SHOW_TIME);

    if (!this.title) this.setTitle('Error');

    return this.build();
  }

  buildWarning(): Alert {
    this.setType('warning');
    this.setShowTime(DEFAULT_SHOW_TIME);

    if (!this.title) this.setTitle('Warning');

    return this.build();
  }
}
