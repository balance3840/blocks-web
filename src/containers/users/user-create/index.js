import React from "react";
import { isAdmin, isTeacher } from "../../../utils/misc";
import UserForm from "../../../components/UserForm";
import { createUser } from "../../../api/users.requests";

export default function UserCreateContainer() {
  if (!isAdmin() && !isTeacher()) {
    return window.location.replace("/");
  }

  return <UserForm onSubmit={onSubmit} />;

  function onSubmit(user) {
    createUser(user).then((response) => {
      if (response.status === 201) {
        window.location.replace("/");
      }
    });
  }
}
