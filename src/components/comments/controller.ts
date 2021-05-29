const CommentsController = (service: any, success: any) => {
  const index = async (req: any, res: any, next: any) => {
    const { query } = req;
    try {
      const comments = await service.findAll(query);
      success(res, 'comments listed', comments, 200);
    } catch (error) {
      next(error);
    }
  };

  const listByPost = async (req: any, res: any, next: any) => {
    const { id: postId } = req.params;
    const { query } = req;
    try {
      const comments = await service.findByPost(postId, query);
      success(res, 'comments listed', comments, 200);
    } catch (error) {
      next(error);
    }
  };

  const create = async (req: any, res: any, next: any) => {
    const { body } = req;
    try {
      const createdComment = await service.insertComment(body);
      success(res, 'comment created', createdComment, 201);
    } catch (error) {
      next(error);
    }
  };

  const destroy = async (req: any, res: any, next: any) => {
    const { id: commentId } = req.params;
    try {
      const deletedComment = await service.deleteComment(commentId);
      success(res, 'comment deleted', deletedComment, 200);
    } catch (error) {
      next(error);
    }
  };

  return {
    index,
    listByPost,
    create,
    destroy,
  };
};

export default CommentsController;
