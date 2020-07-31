import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserCreateContainer from './user-create';
import UserListContainer from './user-list';
import UserEditContainer from './user-edit';

export default function UsersContainer() {
    return (
        <Switch>
            <Route exact path="/users" component={UserListContainer} />
            <Route exact path="/users/create" component={UserCreateContainer} />
            <Route path="/users/:id/edit" component={UserEditContainer} />
        </Switch>
    )
}