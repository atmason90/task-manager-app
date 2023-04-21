import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { format } from "date-fns";
// import { TaskCounter } from "../taskCounter/taskCounter";
import { Task } from "../task/task";


export const Taskarea = () => {
  // state variables for sorting and filtering tasks
  const [sortOption, setSortOption] = useState("date");
  // const [todoCount, setTodoCount] = useState(0);
  // const [inProgressCount, setInProgressCount] = useState(0);
  // const [completeCount, setCompleteCount] = useState(0);
  const [taskData, setTaskData] = useState([]);

  //function for sorting
  function sortTasks(tasks, sortOption) {
    switch (sortOption) {
      case 'title':
        return tasks.sort((a, b) => a.title.localeCompare(b.title));
      case 'status':
        return tasks.sort((a, b) => a.status.localeCompare(b.status));
      case 'date':
        return tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      default:
        return tasks;
    }
  }
  

  useEffect(() => {
    // function to get users tasks
    function getUserTasks() {
      const userEmail = localStorage.getItem("user").replace(/"/g, "");
      fetch(
        `https://dove.task-manager-backend.c66.me/users/search?email=${userEmail}`
      )
        .then((response) => response.json())
        .then((data) => {
          const userId = data.id;
          fetch(
            `https://dove.task-manager-backend.c66.me/users/${userId}/tasks`
          )
            .then((response) => response.json())
            .then((data) => {
              const sortedTasks = sortTasks(data, sortOption)
              setTaskData(sortedTasks);
            });
        });
    }
    getUserTasks();
  }, [sortOption, taskData]);
  

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status of Your Tasks as of {format(new Date(), "PPPP")}</h2>
      </Box>
      <Grid container display="flex" justifyContent="center">
        {/* counters */}
        {/* <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            status={"todo"}
            // count={todoCount}
          />
          <TaskCounter
            status={"inProgress"}
            // count={inProgressCount}
           
          />
          <TaskCounter
            status={"completed"}
            // count={completeCount}
          />
        </Grid> */}
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          mx={20}
          md={10}
          xs={12}
          mb={8}
        >
          <div>
            <InputLabel htmlFor="sort-by">Sort by:</InputLabel>
            <Select
              labelId="sort-by"
              id="sort-by-select"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                // sortTasks(data, sortOption)
              }}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="date">Due Date</MenuItem>
            </Select>
          </div>
        </Grid>
        {/* tasks */}
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          <>
            {taskData.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                due_date={task.due_date}
                description={task.description}
                priority={task.priority}
                status={task.status}
              />
            ))}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
