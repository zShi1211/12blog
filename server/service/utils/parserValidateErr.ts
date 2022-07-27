import { ValidationError } from "class-validator";

export default function parserValidate(errArr: ValidationError[]) {
    return errArr.map(err => err.constraints).flat();
}