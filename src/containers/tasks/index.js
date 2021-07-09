import React from 'react';
import TaskEditContainer from './task-edit';
import { Switch, Route } from 'react-router-dom';
import TaskListContainer from './task-list';
import WorkspaceContainer from '../workspace';

export default function TasksContainer() {
    return (
        <Switch>
            <Route exact path="/tasks" component={TaskListContainer} />
            <Route path="/tasks/:id/edit" component={TaskEditContainer} />
            <Route path="/tasks/:id/workspace" component={WorkspaceContainer} />
        </Switch>
    )
}