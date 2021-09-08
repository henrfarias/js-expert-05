import { read } from 'fs';
import { Readable, Writable, Transform } from 'stream';

export default class TestUtil {
  static generateReadableStream(data) {
    return new Readable({
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
    return new Transform({
      objectMode: true,
      transform(chunk, encoding, cb) {
        onTransform(chunk);
        cb(null, chunk);
      }
    })
  }
}
