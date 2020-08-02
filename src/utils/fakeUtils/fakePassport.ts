const fakePassport = {
		authenticate: () => (req: any, res: any, next: any) => {
				req.user = 'username';
				next();
		}
}

export default fakePassport