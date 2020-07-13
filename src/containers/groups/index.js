import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GroupListContainer from './group-list';
import GroupMembersContainer from './group-members';
import GroupCreateContainer from './group-create';

export default function GroupsContainer() {
    return (
        <Switch>
            <Route exact path="/groups" component={GroupListContainer} />
            <Route exact path="/groups/create" component={GroupCreateContainer} />
            <Route path="/groups/:id/members" component={GroupMembersContainer} />
        </Switch>
    )
}