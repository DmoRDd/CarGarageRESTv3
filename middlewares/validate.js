export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly : false });

        if(error){
            return res.status(400).send(`Validation Error: ${error}`);
        }

        req.body = value;
        next(); 
    }
}