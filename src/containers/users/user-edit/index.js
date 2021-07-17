import React, { useEffect, useState } from "react";
import UserForm from "../../../components/UserForm";
import { isAdmin, isTeacher } from "../../../utils/misc";
import { getUser, editUser } from "../../../api/users.requests";

export default function UserEditContainer({ match: { params } }) {
  const [user, setUser] = useState(null);
  const { id } = params;
  const onlyMineUsers = isTeacher();
  const _isAdmin = isAdmin();

  useEffect(() => {
    getUser(id, onlyMineUsers).then((response) => {
      setUser(response.data);
    });
  }, []);

  return user ? <UserForm hideRole={!_isAdmin} user={user} onSubmit={onSubmit} /> : "";

  function onSubmit(user) {
    editUser(id, user).then((response) => {
      if (response.status === 200) {
        window.location.replace(`/users`);
      }
    });
    console.log(user);
  }
}
