import { useMemo } from "react";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createShoppingItemSchema } from "@/schemas/shoppingItem.schema";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingTable } from "../ShoppingTable";
import ShoppingItemForm from "./ShoppingItemForm";
import { getTetTimelineAuto } from "../../utils/getTetTimelineAuto";
import ShoppingItemMessages from "./ShoppingItemMessages";
import { useQuery } from "@apollo/client/react";
import { GET_SHOPPING_ITEMS_OF_TASK } from "@/graphql/queries/shopping.query";
import { useAuth } from "@/hooks/useAuth";
import { GET_BUDGETS_BY_ID } from "@/graphql/queries/budget.query";
import { formatDate } from "@/utils/formatDate";

export const ShoppingItemDialog = ({
    onClose,
    item = {},
    refetch
}) => {
    const { user } = useAuth();

    const methods = useForm({
        resolver: yupResolver(createShoppingItemSchema),
        defaultValues: {
            taskId: item?.task?.id || "",
            name: item?.name || "",
            budgetId: item?.budget?.id || "",
            price: item?.price || 0,
            quantity: item?.quantity || 1,
            duedTime: formatDate(item?.duedTime || new Date()),
            status: item?.status || "Planning"
        }
    });

    const { control } = methods;

    const [price, quantity, status, budgetId, taskId] = useWatch({
        control,
        name: ["price", "quantity", "status", "budgetId", "taskId"],
    });

    const { data: shoppingItemsData } = useQuery(GET_SHOPPING_ITEMS_OF_TASK, {
        variables: {
            userId: user.id,
            params: {
                taskId: taskId,
            }
        },
        skip: !taskId
    });

    const { data: budgetData } = useQuery(GET_BUDGETS_BY_ID, {
        variables: {
            userId: user.id,
            budgetId: budgetId,
        },
        skip: !budgetId
    })

    const shoppingItemsOfTask = shoppingItemsData?.getShoppingItemsOfUser?.items || [];
    const allocatedAmount = budgetData?.getBudgetByIdOfUser?.allocatedAmount || 0;
    const summary = budgetData?.getBudgetByIdOfUser?.summary || 0;

    const isEdit = Boolean(item?.id);

    const oldItemTotal = useMemo(() => {
        return (item?.price || 0) * (item?.quantity || 0);
    }, [item]);

    const newItemTotal = useMemo(() => {
        return (Number(price) || 0) * (Number(quantity) || 0);
    }, [price, quantity]);

    const totalShoppingCost = useMemo(() => {
        if (!summary) return newItemTotal;

        return isEdit
            ? summary - oldItemTotal + newItemTotal
            : summary + newItemTotal;
    }, [summary, oldItemTotal, newItemTotal, isEdit]);

    const remainingBudget = useMemo(() => {
        if (!allocatedAmount) return 0;
        return allocatedAmount - totalShoppingCost;
    }, [allocatedAmount, totalShoppingCost]);

    return (
        <FormProvider {...methods}>
            <div
                className="fixed inset-0 flex items-center justify-center bg-black/50"
                style={{ zIndex: 1100 }}
                onClick={onClose}
            >
                <div
                    className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto mx-4 relative"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition z-10 cursor-pointer"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>

                    <div className="p-8">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-primary">
                                {!!item.id ? "Edit Shopping Item" : "Shopping Item"}
                            </h2>
                            <p className="mt-1 text-sm text-primary-strong/60">
                                Tet is more fun when your budget stays happy too
                            </p>
                        </div>

                        {/* Form section */}
                        <ShoppingItemForm
                            itemId={item.id}
                            onClose={onClose}
                            refetch={refetch}
                            remainingBudget={remainingBudget}
                        />

                        {/* Preview added section */}
                        <div className="mt-6 flex items-start gap-8">
                            {/* Left */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-primary mb-3">
                                    Shopping Items of Task
                                </h3>
                                <ShoppingTable
                                    mode="mutate"
                                    items={shoppingItemsOfTask}
                                />
                            </div>

                            {/* Right */}
                            <div className="min-w-[300px]">
                                <h3 className="text-lg font-semibold text-primary mb-3">
                                    Budget Preview
                                </h3>
                                <ShoppingItemMessages
                                    status={status}
                                    totalShoppingCost={totalShoppingCost}
                                    remainingBudget={remainingBudget}
                                    maxBudget={allocatedAmount || 0}
                                    isMsgDisplay={!!budgetId}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </FormProvider>
    );
}