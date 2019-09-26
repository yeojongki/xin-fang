import { RequestMethod } from '@nestjs/common/enums';

export interface IRoute {
  method: RequestMethod;
  controllerName: string;
  methodPath: string;
  path: string;
}
