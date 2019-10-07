import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { AppModule } from '@/app.module';

class Seed {
  async init() {
    const logger = new Logger('DB-Seed');
    logger.log('🚀 Seed Start ...');

    const genSql = (str: string, callback: (sql: string) => void) => {
      const sqls = str.split(';');
      sqls.forEach(sql => {
        callback(sql.trim());
      });
    };

    // for connect db
    await NestFactory.create(AppModule);
    const connection = await getConnection();

    // insert datas
    const insert = (sqlName: string) => {
      const sql = fs.readFileSync(join(__dirname, 'seeds', `${sqlName}.sql`), 'utf-8');
      genSql(sql, async str => {
        if (str) {
          try {
            await connection.query(str);
          } catch (error) {
            console.log(error);
          }
        }
      });
    };

    insert('role');
    insert('permission');
    insert('role_permission');
    insert('user');
    insert('user_role');
    insert('city');
    insert('subway');

    logger.log('🚀 Seed Complete !');
  }
}

new Seed().init();
