import React from 'react';
import TaskEditContainer from './task-edit';
import { Switch, Route } from 'react-router-dom';

export default function TasksContainer() {
    return (
        <Switch>
            <Route path="/tasks/:id/edit" component={TaskEditContainer} />
        </Switch>
    )
}