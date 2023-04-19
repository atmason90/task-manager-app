
export const emitCorrectLabel = (status) => {
    switch (status) {
        case 'todo':
            return `To-do's`;
        case 'inProgress':
            return `In Progress`;
        case 'completed':
            return `Completed`;
    }
};