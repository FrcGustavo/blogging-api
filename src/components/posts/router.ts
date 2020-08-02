const PostsRouter = (router: any, controller: any, passport: any) => {
  router.get(
    '/author',
    passport.authenticate('jwt', { session: false }),
    controller.findByAuthor,
  );
  router.get('/', controller.index);
  router.post('/',
    passport.authenticate('jwt', { session: false }),
    controller.create,
  );
  router.get('/:slug', controller.show);
  router.patch(
    '/:slug',
    passport.authenticate('jwt', { session: false }),
    controller.update,
  );
  router.delete(
    '/:slug',
    passport.authenticate('jwt', { session: false }),
    controller.destroy,
  );
};

export default PostsRouter;
