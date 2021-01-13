import { User } from './../entity/User';
import { createConnection, getConnectionOptions } from 'typeorm';

export const createTypeORMConnection = async () => {
  const connectinOptions = await getConnectionOptions(process.env.NODE_ENV);

  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectinOptions,
        url: process.env.DATABASE_URL as string,
        name: 'default',
        entities: [User],
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      } as any)
    : createConnection({
        ...connectinOptions,
        name: 'default',
      });
};
