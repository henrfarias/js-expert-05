import Busboy from 'busboy';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { logger } from './logger';

export default class UploadHandler {
  constructor({ io, socketId, downloadsFolder }) {
    this.io = io;
    this.socketId = socketId;
    this.downloadsFolder = downloadsFolder;
  }

  handleFileBytes() {}

  async onFile(fieldname, file, filename) {
    const saveTo = `${this.downloadsFolder}/${filename}`;
    await pipeline(
      // 1 passo, pegar uma readable stream
      file,
      // 2 passo, filtrar, converter, transformar dados
      this.handleFileBytes.apply(this, [filename]),
      // 3 passo, é a saída do processo, uma writable stream
      fs.createWriteStream(saveTo)
    );

    logger.info(`File [${filename}] finished`);
  }

  registerEvents(headers, onFinish) {
    const busboy = new Busboy({ headers });

    busboy.on('file', this.onFile.bind(this));
    busboy.on('finish', onFinish);
    return busboy;
  }
}
