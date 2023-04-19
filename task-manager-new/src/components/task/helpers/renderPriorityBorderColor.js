// import { Priority } from "../../createTaskForm/enums/priority";

export const renderPriorityBorderColor = (priority) => {
    switch (priority) {
        case 'normal':
            return 'grey.900';
        case 'low':
            return 'info.light';
        case 'high':
            return 'error.light';
        default:
            return 'grey.900';
    }
}; 