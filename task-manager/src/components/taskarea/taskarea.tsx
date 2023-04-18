import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Grid, Box, Alert, LinearProgress, Select, MenuItem, InputLabel } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';


export const Taskarea: FC = (): ReactElement => {

  const taskUpdatedContext = useContext(TaskStatusChangedContext);

  // state variables for sorting and filtering tasks
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');

  const { error, isLoading, data, refetch } = useQuery(
    ['tasks'],
    async () => {
      return await sendApiRequest<ITaskApi[]>(
        'http://localhost:3001/tasks',
        'GET',
      );
    },
  );

  // Update task mutation
  const updateTaskMutation = useMutation(
    (data: IUpdateTask) => sendApiRequest(
      'http://localhost:3001/tasks',
      'PUT',
      data
    )
  );

  useEffect(() => {
    refetch();
  }, [taskUpdatedContext.updated]);

  useEffect(() => {
    if(updateTaskMutation.isSuccess) {
      taskUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess])

  function onStatusChangeHandler (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    })
  }

  function markCompleteHandler (
    e: 
    | React.MouseEvent<HTMLButtonElement> 
    | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    })
  }

  //functions for sorting and filtering
  function handleSortByTitle () {
    setSortOption('title')
  }

  function handleSortByStatus () {
    setSortOption('status')
  }

  function handleSortByDate () {
    setSortOption('date')
  }

  function handleFilterByStatues (status: string) {
    setFilterOption(status)
  }

  function sortTasks(tasks: ITaskApi[], sortOption: string) {
    if (sortOption === 'title') {
      return tasks.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOption === 'status') {
      return tasks.sort((a, b) => a.status.localeCompare(b.status))
    } else {
      return tasks.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime()
      })
    }
  }

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status of Your Tasks as of{' '}
          {format(new Date(), 'PPPP')}  
        </h2>
      </Box>
      <Grid 
        container
        display='flex'
        justifyContent='center'
        >
          {/* counters */}
          <Grid 
            item
            display='flex'
            flexDirection='row'
            justifyContent='space-around'
            alignItems='center'
            md={10}
            xs={12}
            mb={8}
          >
            <TaskCounter
              status={Status.todo}
              count={
                data ? countTasks(data, Status.todo) : undefined
              }
            />
            <TaskCounter 
              status={Status.inProgress}
              count={
                data ? countTasks(data, Status.inProgress) : undefined
              }
            />
            <TaskCounter 
              status={Status.completed}
              count={
                data ? countTasks(data, Status.completed) : undefined
              }
            />
          </Grid>
          <Grid
              item
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              alignItems='flex-end'
              mx={20}
              md={10}
              xs={12}
              mb={8}
          >
           <div>
            <InputLabel htmlFor="sort-by">Sort by:</InputLabel>
            <Select
              labelId='sort-by'
              id='sort-by-select'
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <MenuItem value='title'>Title</MenuItem>
              <MenuItem value='status'>Status</MenuItem>
              <MenuItem value='date'>Due Date</MenuItem>
            </Select>
           </div>
          </Grid>
          {/* tasks */}
          <Grid 
            item
            display='flex'
            flexDirection='column'
            xs={10}
            md={8}
          >
            <>
            {error && (
            <Alert severity='error'>
              There was an error fetching your tasks
            </Alert>
            )}
            {!error && Array.isArray(data) && data.length === 0 && (    
            <Alert severity='warning'>
              You do not have any tasks create yet. Start by creating a task.
            </Alert>
            )}
            {isLoading ? (
            <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((each, index) => {
                return each.status === Status.todo || 
                  each.status === Status.inProgress 
                  ? (
                    <Task 
                      key={index + each.priority}
                      id={each.id}
                      title={each.title}
                      date={new Date(each.date)}
                      description={each.description}
                      priority={each.priority}
                      status={each.status}
                      onStatusChange={onStatusChangeHandler}
                      onClick={markCompleteHandler}
                    />
                ): (
                  false
                );
              })
            )}
            </>
          </Grid>
      </Grid>
    </Grid>
  )
}

