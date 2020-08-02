const fakePassport = {
    authenticate: () => (req: any, res: any, next: any) => next(),
}

export default fakePassport