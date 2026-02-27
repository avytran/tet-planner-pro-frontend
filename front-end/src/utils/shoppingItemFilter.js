export function filterShoppingItems(items, filters) {
    const [min, max] = filters.priceRange || [0, 5000000];

    return items.filter(item => {
        const priceOk = item.price >= min && item.price <= max;
        const categoryOk = !filters.categories?.length || filters.categories.includes(item.budget.id);
        const statusOk = !filters.status?.length || filters.status.includes(item.status);
        const timelineOk = !filters.timeline?.length || filters.timeline.includes(item.timeline);

        return priceOk && categoryOk && statusOk && timelineOk;
    });
}