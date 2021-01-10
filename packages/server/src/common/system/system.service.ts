import { Injectable } from '@nestjs/common';
import shell = require('shelljs');

@Injectable()
export class SystemService {
  public run(cmd: string) {
    return new Promise((resolve, reject) => {
      // Execute the command, reject if we exit non-zero (i.e. error)
      shell.exec(cmd, function (code, stdout, stderr) {
        if (code !== 0) return reject(new Error(stderr));
        return resolve(stdout);
      });
    });
  }
}
