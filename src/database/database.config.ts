import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}`});

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  entities: [process.env.MYSQL_ENTITIES],
  migrations: [__dirname + "/migrations/*.js"],
  synchronize: process.env.NODE_ENV === 'test',
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;