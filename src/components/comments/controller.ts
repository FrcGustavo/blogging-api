import service from "../posts/service";

const CommentsController = (service: any) => {
    const index = (req: any, res: any) => {
        res.send('HOLA MUNDO');
    };

    const show = (req: any, res: any) => {
        res.send('BY ID PERSONALIZADO');
    };

    const create = async (req: any, res: any, next: any) => {
        try {
            const createdComment = await service.insertComment(); 
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