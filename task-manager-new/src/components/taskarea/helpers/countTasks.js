
export const countTasks = (
    tasks,
    status,
) => {
    if(!Array.isArray(tasks)) {
        return 0;
    }
    const totalTasks = tasks.filter((task) => {
        return task.status === status;
    })
    return totalTasks.length;
};