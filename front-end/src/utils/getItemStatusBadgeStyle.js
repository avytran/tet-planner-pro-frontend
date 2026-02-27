export const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Completed':
            return 'bg-success text-white';
        case 'Planning':
            return 'bg-accent text-white';
        default:
            return 'bg-text-muted/20 text-text-muted';
    }
};