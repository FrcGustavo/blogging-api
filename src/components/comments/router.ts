const CommentsRouter = (router: any, controller: any, middlewares?: any) => {
    router.get('/', controller.index);
    router.get('/:id', controller.show);
    router.post('/', controller.create);
};

export default CommentsRouter;