import cloudinary from 'cloudinary';

import saveInLocal from './saveInLocal';
import config from '../../config';


const uploader = (file: any) => {
	if (config.srv.mode === 'development') {
		return saveInLocal(file);
	}

	const type = file.mimetype.split('/')[0];
	return cloudinary.v2.uploader.upload(file.path, {
		resource_type: type,
	});
};

export default uploader;