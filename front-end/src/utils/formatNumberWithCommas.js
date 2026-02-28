export const formatNumberWithCommas = (value) => {
    if (value === null || value === undefined) return "";

    const parts = value.toString().replace(/,/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
