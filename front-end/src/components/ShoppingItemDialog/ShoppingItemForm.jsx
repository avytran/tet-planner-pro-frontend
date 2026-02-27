import { useAuth } from "@/hooks/useAuth";

import { useQuery, useMutation } from "@apollo/client/react";
import { GET_SHOPPING_FORM_DATA } from "@/graphql/queries/shopping.query";
import { CREATE_SHOPPING_ITEM, UPDATE_SHOPPING_ITEM } from "@/graphql/mutations/shopping.mutation";

import { useFormContext } from "react-hook-form";

import { getTetTimelineAuto } from "../../utils/getTetTimelineAuto";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";

import { SHOPPING_ITEM_STATUS, TIMELINE_MAPPING } from "@/constants/shoppingConstant";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

import CommonButton from "../Button/CommonButton";

export default function ShoppingItemForm({ onClose, itemId, refetch }) {
    const { user } = useAuth();

    const { data: formFieldsData } = useQuery(GET_SHOPPING_FORM_DATA, {
        variables: {
            userId: user.id
        }
    });

    const budgetCategories = formFieldsData?.getBudgetsOfUser;
    const tasks = formFieldsData?.getTasksOfUser?.tasks;

    const [mutateShoppingItem] = useMutation(!!itemId ? UPDATE_SHOPPING_ITEM : CREATE_SHOPPING_ITEM, {
        onCompleted: () => {
            refetch();
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useFormContext();

    const duedTime = watch("duedTime");

    const onSubmit = async (data) => {
        await mutateShoppingItem({
            variables: {
                userId: user.id,
                input: {
                    ...data,
                    price: Number(data.price.replaceAll(",", ""))
                },
                itemId: itemId,
            }
        });
        onClose();
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
                {/* Task */}
                <div>
                    <label className="text-sm font-semibold text-primary-strong">
                        Task
                    </label>

                    <div className="relative">
                        <select
                            {...register("taskId")}
                            className="w-full appearance-none rounded-lg border border-primary/20 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-primary/50"
                        >
                            <option value="">-- Select Task --</option>
                            {tasks?.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>

                        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    </div>
                    <p className="mt-1 min-h-[16px] text-red-500 text-xs">
                        {errors.taskId?.message || ""}
                    </p>
                </div>

                {/* Budget Category */}
                <div>
                    <label className="text-sm font-semibold text-primary-strong">
                        Budget Category
                    </label>

                    <div className="relative">
                        <select
                            {...register("budgetId")}
                            className="w-full appearance-none rounded-lg border border-primary/20 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-primary/50"
                        >
                            {budgetCategories?.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    </div>

                    <p className="mt-1 min-h-[16px] text-red-500 text-xs">
                        {errors.budgetId?.message || ""}
                    </p>
                </div>
            </div>

            {/* Grid row */}
            <div className="grid grid-cols-5 gap-4">
                {/* Item name */}
                <FieldRow label="Item Name" className="col-span-2">
                    <input
                        {...register("name")}
                        type="text"
                        className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    />

                    <p className="min-h-[16px] text-red-500 text-xs">
                        {errors.name?.message || ""}
                    </p>
                </FieldRow>

                {/* Price */}
                <FieldRow label="Estimated Price" className="col-span-1">
                    <div className="relative">
                        <input
                            {...register("price")}
                            value={formatNumberWithCommas(watch("price"))}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/,/g, "");
                                setValue("price", raw, { shouldValidate: true });
                            }}
                            type="text"
                            min={0}
                            className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm bg-white pl-1 text-primary/60">
                            VND
                        </span>
                    </div>

                    <p className="min-h-[16px] text-red-500 text-xs">
                        {errors.price?.message || ""}
                    </p>
                </FieldRow>

                {/* Quantity */}
                <FieldRow label="Quantity" className="col-span-1">
                    <input
                        {...register("quantity")}
                        type="number"
                        min={1}
                        className="w-full rounded-lg border border-primary/20 bg-white px-2 py-2 text-sm outline-none focus:border-primary/50"
                    />

                    <p className="min-h-[16px] text-red-500 text-xs">
                        {errors.quantity?.message || ""}
                    </p>
                </FieldRow>

                {/* Due time */}
                <FieldRow label="Due Time" className="col-span-1">
                    <input
                        {...register("duedTime")}
                        type="date"
                        className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    />

                    {/* Timeline tag */}
                    {duedTime && (
                        <div className="mt-0 flex justify-end">

                            <span className="inline-block px-2 py-0 text-xs rounded-full bg-accent-soft text-black">
                                {TIMELINE_MAPPING[getTetTimelineAuto(duedTime)]}
                            </span>
                        </div>
                    )}
                </FieldRow>

                {/* Status */}
                <FieldRow label="Status" className="col-span-1">
                    <div className="relative">
                        <select
                            {...register("status")}
                            className="w-full appearance-none rounded-lg border border-primary/20 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-primary/50"
                        >
                            {SHOPPING_ITEM_STATUS.map((o) => (
                                <option key={o} value={o}>
                                    {o}
                                </option>
                            ))}
                        </select>

                        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    </div>

                    <p className="min-h-[16px] text-red-500 text-xs">
                        {errors.status?.message || ""}
                    </p>
                </FieldRow>
            </div>
            {/* Save button */}
            <div className="pt-4 flex justify-center">
                <CommonButton
                    label="Save change"
                    color="accent"
                    type="submit"
                />
            </div>
        </form>
    );
}

function FieldRow({ label, children, inline = false }) {
    return (
        <div
            className={`grid gap-1 items-start ${inline ? "grid-cols-[80px_1fr]" : "grid-cols-1"
                }`}
        >
            <label className="text-sm font-semibold text-primary-strong leading-none">
                {label}
            </label>

            <div className="flex flex-col gap-1 min-h-[52px]">
                {children}
            </div>
        </div>
    );
}