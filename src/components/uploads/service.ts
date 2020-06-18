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
}