import { body, validationResult } from 'express-validator';

function validate(fieldName){
    return body(fieldName).isString().withMessage(`From Login or SignUp ${fieldName} is not a string`).trim().notEmpty().withMessage(`${fieldName} is empty`);
}

function validatedResult(req,res,next){
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    next();
}

export {validate,validatedResult};