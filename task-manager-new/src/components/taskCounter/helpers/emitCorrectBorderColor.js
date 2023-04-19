export const emitCorrectBorderColors = (status) => {
    switch (status) {
        case 'todo':
            return 'error.light';
        case 'inProgress':
            return 'warning.light';
        case 'completed':
            return 'success.light';
    }
};