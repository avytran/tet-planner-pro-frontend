export const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();

    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    const mappedDate = localDate.toISOString().slice(0, 10);

    return mappedDate;
};