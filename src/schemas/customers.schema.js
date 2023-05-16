import joiBase from "joi"
import joiDate from "@joi/date"

const joi = joiBase.extend(joiDate)

export const customerSchema = joi.object({
    name: joi.string().trim().required(),
    phone: joi.string().trim().min(10).max(11).pattern(/^\d+$/).required(),
    cpf: joi.string().trim().length(11).pattern(/^\d+$/).messages({'string.pattern.base': `Celular deve ter entre 10 e 11 digitos.`}).required(),
    birthday: joi.date().format(['YYYY-MM-DD']).required()
})