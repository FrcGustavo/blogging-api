import fs from 'fs';
import path from 'path';
import uploader from '../../utils/uploader';

export default class UploadsService {

  validateFile(file: any) {
    const { size } = file;
    const type = file.mimetype.split('/')[1];
    const validType = type === 'jpg' || type === 'png' || type === 'jpeg' || type === 'gif';

    if (validType && size < 5500000) {
      return file;
    }

    throw false;
  }

  async uploadFile(files: any) {
    const file = this.validateFile(files);
    const uploadedFile = await uploader(file);
    return uploadedFile;
  }

  async findFile(id: any) {
    return new Promise((resolve, reject) => {
      const pathFile = `uploads/${id}`;
      fs.exists(pathFile, (exists) => {
        if (!exists) { return reject('not foun image'); }
        return resolve(path.resolve(pathFile));
      });
    });
  }
}