import * as yup from "yup";
const STATUS = ["Planning", "Completed"];

export const createShoppingItemSchema = yup.object({
    taskId: yup
        .string()
        .nullable(),
    name: yup
        .string()
        .required("Name is required"),
    budgetId: yup
        .string()
        .required("Budget Category is required"),
    price: yup
        .string()
        .min(0, "Price must be at least 0")
        .required("Price is required"),
    quantity: yup
        .number()
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
    duedTime: yup
        .date()
        .typeError("Invalid date")
        .required("Due time is required"),
    status: yup
        .string()
        .oneOf(Object.values(STATUS), "Invalid status")
        .required("Status is required"),
});