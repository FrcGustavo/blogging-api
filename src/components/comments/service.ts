const CommentsService = (model: any, validParams: any, requireParams: any, setupPagination: any, toDoPagination: any) => {
    const requiredFields = ['post', 'body'];
    const validFields = [ ...requiredFields, 'username' ];

    const findAll = async (query: object) => {
        const {
            limit,
            skip,
            sort,
            page,
        } = setupPagination(query);

        const filters = { isDisabled: false };
        const pagination = await toDoPagination(model, { limit, page }, filters);
        const comments = await model.find(filters)
            .limit(limit)
            .sort(sort)
            .skip(skip);

        const emptyComments = comments.map(({
            username,
            body,
            createdAt
        }: any) => ({
            username,
            body,
            createdAt
        }));

        return { comments: emptyComments, pagination };
    }

    const insertComment = async (comment: any) => {
        const validComment = requireParams(
            requiredFields,
            validParams(validFields, comment),
        );
        const createdComment = await model.create(validComment);
        return createdComment;
    };

    return {
        findAll,
        insertComment,
    };
};

export default CommentsService;