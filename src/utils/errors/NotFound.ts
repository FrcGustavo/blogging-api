export default class NotFound extends Error {

	public status: number;

	constructor(message = 'not found', status = 404) {
		super(message);
		this.name = 'Not Found';
		this.status = status;
	}
}
