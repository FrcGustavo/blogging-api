const CommentsController = () => {
    const index = (req: any, res: any) => {
        res.send('HOLA MUNDO');
    };

    const show = (req: any, res: any) => {
        res.send('BY ID PERSONALIZADO');
    };

    return {
        index,
        show,
    }

};

export default CommentsController;