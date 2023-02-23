import * as yup from "yup"

export const idValidator = yup.number().integer().min(1)

export const titleValidator = yup.string().min(1).max(300)

export const contentValidator = yup.string().min(1)

export const limitValidator = yup.number().integer().min(1).max(100).default(5)

export const pageValidator = yup.number().integer().min(1).default(1)
