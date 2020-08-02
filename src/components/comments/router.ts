const CommentsRouter = (router: any, controller: any, middlewares?: any) => {
    router.get('/', controller.index);
    router.post('/', controller.create);
    router.delete('/:id', controller.destroy);
};

export default CommentsRouter;