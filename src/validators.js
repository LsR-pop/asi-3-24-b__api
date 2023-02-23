import * as yup from "yup"

export const idValidator = yup.number().integer().min(1).label("ID")

export const titleValidator = yup.string().min(1).max(300).label("Title")

export const contentValidator = yup.string().min(1).label("Content")
