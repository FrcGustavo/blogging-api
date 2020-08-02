const CommentsService = (model: any, validParams: any, requireParams: any) => {
    const requiredFields = ['post', 'body'];
    const validFields = [ ...requiredFields, 'username' ];

    const insertComment = async (comment: any) => {
        const validComment = requireParams(
            requiredFields,
            validParams(validFields, comment),
        );
        const createdComment = await model.create(validComment);
        return createdComment;
    };

    return {
        insertComment,
    };
};

export default CommentsService;