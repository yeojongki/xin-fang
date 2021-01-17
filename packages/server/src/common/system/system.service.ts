import { Injectable, Logger } from '@nestjs/common';
import shell = require('shelljs');
import { ConfigService } from '../config/config.service';

@Injectable()
export class SystemService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * logger
   *
   * @private
   * @memberof SystemService
   */
  private readonly logger = new Logger(SystemService.name);

  public run(cmd: string): Promise<string> {
    this.logger.log(`run cmd: ${cmd}`);
    return new Promise((resolve, reject) => {
      // Execute the command, reject if we exit non-zero (i.e. error)
      shell.exec(cmd, function (code, stdout, stderr) {
        if (code !== 0) return reject(new Error(stderr));
        return resolve(stdout);
      });
    });
  }

  /**
   * 重新加载服务
   *
   * @returns
   * @memberof SystemService
   */
  public reloadServer() {
    return this.run(`pm2 reload ${this.configService.PM2_PROJECT_NAME}`);
  }
}
