import { describe, test, expect, jest } from '@jest/globals';
import fs from 'fs/promises';
import FileHelper from '../../src/fileHelper.js';

describe('#FileHelper', () => {
  describe('#getFilesStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 64768,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 28445984,
        size: 618565,
        blocks: 1216,
        atimeMs: 1630984554866.289,
        mtimeMs: 1630984554614.2878,
        ctimeMs: 1630984554618.2878,
        birthtimeMs: 1630984554614.2878,
        atime: '2021-09-07T03:15:54.866Z',
        mtime: '2021-09-07T03:15:54.614Z',
        ctime: '2021-09-07T03:15:54.618Z',
        birthtime: '2021-09-07T03:15:54.614Z',
      };

      const mockUser = 'henrfarias';
      process.env.USER = mockUser;
      const filename = 'file.png';

      jest
        .spyOn(fs, fs.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs, fs.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus('/tmp');

      const expectedResult = [
        {
          size: '619 kB',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
