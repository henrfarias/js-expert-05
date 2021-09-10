import { jest } from '@jest/globals';
import { Readable, Writable, Transform } from 'stream';

export default class TestUtil {
  static mockDateNow(mockImplementationPeriods) {
    const now = jest.spyOn(global.Date, global.Date.now.name);

    mockImplementationPeriods.forEach((time) => {
      now.mockReturnValueOnce(time);
    });
  }

  static getTimeFromDate(dateString) {
    return new Date(dateString).getTime();
  }

  static generateReadableStream(data) {
    return new Readable({
      objectMode: true,
      read() {
        for (const item of data) {
          this.push(item);
        }

        this.push(null);
      },
    });
  }

  static generateWriteableStream(onData) {
    return new Writable({
      objectMode: true,
      write(chunk, encoding, cb) {
        onData(chunk);

        cb(null, chunk);
      },
    });
  }

  static generateTransformStream(onTransform) {
    // async function* handle(source) {
    //   for await(const chunk of source) {
    //     yield chunk
    //   }
    // }

    return new Transform({
      objectMode: true,
      transform(chunk, encoding, cb) {
        onTransform(chunk);
        cb(null, chunk);
      },
    });
  }
}
