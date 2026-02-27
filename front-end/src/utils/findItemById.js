export const findItemById = (items, targetId) => {
    for (const i of items) {
        if (i.id === targetId) {
            return i;
        }
    }
}