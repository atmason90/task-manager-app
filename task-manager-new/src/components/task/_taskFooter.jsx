import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { TaskDateField } from "../createTaskForm/_taskDateField";
import { TaskDescriptionField } from "../createTaskForm/_taskDescriptionField";
import { TaskSelectField } from "../createTaskForm/_taskSelectField";
import { TaskTitleField } from "../createTaskForm/_taskTitleField";

export const TaskFooter = (props) => {
  // Destructure props
  const {
    id,
    title,
    description,
    priority,
    due_date,
    status,
    onStatusChange = (e) => console.log(e),
    onDelete = (e) => console.log(e),
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [titleVal, setTitleVal] = useState(title);
  const [descriptionVal, setDescriptionVal] = useState(description);
  const [dateVal, setDateVal] = useState(new Date(due_date));
  const [statusVal, setStatusVal] = useState(status);
  const [priorityVal, setPriorityVal] = useState(priority);

  const formattedDate = dateVal.toISOString().split("T")[0];

  const updateTaskStatus = (newStatus) => {
    const userEmail = localStorage.getItem("user").replace(/"/g, "");
    fetch(
      `https://dove.task-manager-backend.c66.me/users/search?email=${userEmail}`
    )
      .then((response) => response.json())
      .then((data) => {
        const userId = data.id;
        fetch(
          `https://dove.task-manager-backend.c66.me/users/${userId}/tasks/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );
      })
      .then((response) => response.json())
      .then((data) => {
        onStatusChange(data.status);
      })
      .catch((error) => console.error(error));
  };

  const deleteTask = () => {
    const userEmail = localStorage.getItem("user").replace(/"/g, "");
    fetch(
      `https://dove.task-manager-backend.c66.me/users/search?email=${userEmail}`
    )
      .then((response) => response.json())
      .then((data) => {
        const userId = data.id;
        return fetch(
          `https://dove.task-manager-backend.c66.me/users/${userId}/tasks/${id}`,
          {
            method: "DELETE",
          }
        );
      })
      .then(() => {
        // If the task was deleted successfully, call a callback function to notify the parent component
        // You can define the callback function as a prop and pass it down to TaskFooter
        onDelete(id);
      })
      .catch((error) => console.error(error));
  };

  function editTaskHandler() {
    if (!titleVal || !dateVal || !descriptionVal) {
      return;
    };
    const userEmail = localStorage.getItem('user').replace(/"/g, '');
    fetch(`https://dove.task-manager-backend.c66.me/users/search?email=${userEmail}`)
      .then(response => response.json())
      .then(data => {
        const userId = data.id;
        fetch(`https://dove.task-manager-backend.c66.me/users/${userId}/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: titleVal,
            description: descriptionVal,
            priority: priorityVal,
            status: statusVal,
            due_date: formattedDate
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
        })
        .catch(error => console.log('Error editing task:', error));
      })
      .catch(error => console.log('Error fetching user data:', error));
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      my={4}
    >
      {status === "completed" ? (
        <Typography sx={{ fontWeight: "bold", color: "success.main" }}>
          COMPLETE
        </Typography>
      ) : (
        <FormControlLabel
          label="In Progress"
          control={
            <Switch
              onChange={(e) => {
                const newStatus = e.target.checked ? "inProgress" : "todo";
                updateTaskStatus(newStatus);
              }}
              color="warning"
              defaultChecked={status === "inProgress"}
            />
          }
        />
      )}
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: "#ffffff" }}
        onClick={(e) => {
          updateTaskStatus("completed");
        }}
        disabled={status === "completed"}
      >
        Complete
      </Button>
      <Button
        variant="contained"
        color="warning"
        size="small"
        sx={{ color: "#ffffff" }}
        onClick={() => {
            setIsEditing(true)
            setTitleVal(title);
            setDescriptionVal(description);
            setPriorityVal(priority);
            setDateVal(new Date(due_date));
            setStatusVal(status);
        }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        sx={{ color: "#ffffff" }}
        onClick={deleteTask}
      >
        Delete
      </Button>
      {isEditing && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          px={4}
          my={6}
        >
          <Typography mb={2} component="h2" variant="h6">
            Edit Task
          </Typography>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {/* Title of task */}
            <TaskTitleField value={title} onChange={(e) => setTitleVal(e.target.value)} />
            {/* Task Description */}
            <TaskDescriptionField
              value={description} onChange={(e) => setDescriptionVal(e.target.value)}
            />
            {/* Date */}
            <TaskDateField value={dateVal} onChange={(date) => setDateVal(date)} />
            <Stack direction="row" spacing={2}>
              {/* Task Status & Priority */}
              <TaskSelectField
                label="Status"
                name="status"
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value)}
                items={[
                  {
                    value: "todo",
                    label: "todo",
                  },
                  {
                    value: "inProgress",
                    label: "inProgress",
                  },
                  {
                    value: "completed",
                    label: "completed"
                  }
                ]}
              />
              <TaskSelectField
                label="Priority"
                name="priority"
                value={priorityVal}
                onChange={(e) => setPriorityVal(e.target.value)}
                items={[
                  {
                    value: "low",
                    label: "low",
                  },
                  {
                    value: "normal",
                    label: "normal",
                  },
                  {
                    value: "high",
                    label: "high",
                  },
                ]}
              />
            </Stack>
            <Button
              disabled={!titleVal || !descriptionVal || !dateVal || !statusVal || !priorityVal}
              onClick={() => {
                editTaskHandler();
                setIsEditing(false);
              }}
              variant="contained"
              size="large"
              fullWidth
            >
              Save
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

TaskFooter.propTypes = {
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
};
