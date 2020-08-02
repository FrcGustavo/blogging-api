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

    const show = (req: any, res: any) => {
        res.send('BY ID PERSONALIZADO');
    };

    const create = async (req: any, res: any, next: any) => {
        const { body } = req;
        try {
            const createdComment = await service.insertComment(body);
            success(res, 'comment created', createdComment, 201);
        } catch (error) {
            next(error);
        }
    }

    return {
        index,
        show,
        create,
    }

};

export default CommentsController;