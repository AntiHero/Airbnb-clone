import { restorePasswordPrefix } from '../constants';
import { Redis } from "ioredis";
import { v4 } from 'uuid';
// http://localhost:4000
// https://my-site.com => https://my-site.com/confirm<id>
export const createResotrePasswordEmailLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4();
  await redis.set(`${restorePasswordPrefix}${id}`, userId, "ex", 60 * 20);

  return `${url}/change-password/${id}`;
};
