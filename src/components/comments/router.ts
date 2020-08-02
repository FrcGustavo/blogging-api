const CommentsRouter = (router: any, controller: any, passport: any) => {
    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        controller.index,
    );
    router.get('/:id', controller.listByPost);
    router.post('/', controller.create);
    router.delete(
        '/:id',
        passport.authenticate('jwt', { session: false }),
        controller.destroy,
    );
};

export default CommentsRouter;