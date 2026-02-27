import * as yup from "yup";
const STATUS = ["Todo", "In_Progress", "Done"];
const PRIORITY = ["Low", "Medium", "High"];

export const createTaskSchema = yup.object({
    title: yup
        .string()
        .required("Title is required"),
    status: yup
        .string()
        .oneOf(Object.values(STATUS), "Invalid status")
        .required("Status is required"),
    priority: yup
        .string()
        .oneOf(Object.values(PRIORITY), "Invalid priority")
        .required("Priority is required"),
    duedTime: yup
        .date()
        .typeError("Invalid date")
        .required("Due time is required"),
    categoryId: yup
        .string()
        .required("Category is required"),
});