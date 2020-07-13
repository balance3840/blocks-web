import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GroupListContainer from './group-list';
import GroupMembersContainer from './group-members';

export default function GroupsContainer() {
    return (
        <Switch>
            <Route exact path="/groups" component={GroupListContainer} />
            <Route path="/groups/:id/members" component={GroupMembersContainer} />
        </Switch>
    )
}