import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}

/*
// Usage in a service
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class PostService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async cachePost(id: string, data: any) {
    await this.redisClient.set(`post:${id}`, JSON.stringify(data), 'EX', 3600);
  }

  async getCachedPost(id: string) {
    const data = await this.redisClient.get(`post:${id}`);
    return data ? JSON.parse(data) : null;
  }
}
*/
