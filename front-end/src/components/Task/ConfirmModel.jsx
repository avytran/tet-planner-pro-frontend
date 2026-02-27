export const ConfirmModel = ({ setOpenConfirm, title, msg, item, mutationName, handleMutation}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[320px] rounded-xl bg-white p-5 shadow-lg">
                <h3 className="text-lg font-semibold text-primary-strong">
                    {title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                    {msg}
                </p>

                <p className="mt-1 text-sm font-semibold text-red-500">
                    {item}
                </p>

                <div className="mt-4 flex justify-end gap-3">
                    <button
                        className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => setOpenConfirm(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 cursor-pointer"
                        onClick={handleMutation}
                    >
                        {mutationName}
                    </button>
                </div>
            </div>
        </div>
    )
}
