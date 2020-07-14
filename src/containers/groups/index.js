import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GroupListContainer from './group-list';
import GroupMembersContainer from './group-members';
import GroupCreateContainer from './group-create';
import GroupEditContainer from './group-edit';
import GroupTaskCreateContainer from './group-task-create';
import GroupTasksContainer from './group-tasks';

export default function GroupsContainer() {
    return (
        <Switch>
            <Route exact path="/groups" component={GroupListContainer} />
            <Route exact path="/groups/create" component={GroupCreateContainer} />
            <Route path="/groups/:id/edit" component={GroupEditContainer} />
            <Route path="/groups/:id/members" component={GroupMembersContainer} />
            <Route path="/groups/:id/tasks/add" component={GroupTaskCreateContainer} />
            <Route path="/groups/:id/tasks" component={GroupTasksContainer} />
        </Switch>
    )
}