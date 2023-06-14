import Bottleneck from 'bottleneck';

export default class ThrottleUtil {
  private limiter: Bottleneck;

  constructor(time: number) {
    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: time,
    });
  }

  async tryAcquire(key: string): Promise<boolean> {
    try {
      await this.limiter.schedule(() => Promise.resolve(), key, 10000);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
