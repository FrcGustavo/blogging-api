import fs from 'fs';

import config from '../../config';

const saveInLocal = (file: any) => new Promise((resolve, reject) => {
  const { originalname } = file;
  const newPath = `${file.path}.${originalname}`;

  const secureUrl = `http://localhost:${config.srv.port}/api/uploads/${newPath.split('/')[1]}`;
  const resourceType = file.mimetype.split('/')[0];
  const format = file.mimetype.split('/')[1];

  fs.copyFile(file.path, newPath, (error) => {
    if (error) { return reject(error); }
    return resolve({
      secure_url: secureUrl,
      resource_type: resourceType,
      format,
    });
  });
});

export default saveInLocal;