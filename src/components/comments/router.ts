const CommentsRouter = (router: any, controller: any, passport: any) => {
    router.get('/', controller.index);
    router.post('/', controller.create);
    router.delete(
        '/:id',
        passport.authenticate('jwt', { session: false }),
        controller.destroy,
    );
};

export default CommentsRouter;