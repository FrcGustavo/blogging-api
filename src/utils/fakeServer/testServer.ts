import express from 'express';
import supertest from 'supertest';

const testServer = (router: any, path: string) => {
		const app = express();
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
		app.use(path, router);
		return supertest(app);
};

export default testServer;
