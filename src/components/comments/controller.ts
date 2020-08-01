const CommentsController = (service: any, success: any) => {
    const index = (req: any, res: any) => {
        res.send('HOLA MUNDO');
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