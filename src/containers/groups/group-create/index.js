import React from "react";
import GroupForm from "../../../components/GroupForm";
import { createGroup } from "../../../api/group.requests";
import { isAdmin, isTeacher } from "../../../utils/misc";

export default function GroupCreateContainer() {

  const _isAdmin = isAdmin();
  const _isTeacher = isTeacher();

  if (!_isAdmin && !_isTeacher) {
    return window.location.replace("/");
  }
  
  return <GroupForm onSubmit={onSubmit} />;

  function onSubmit(group) {
    createGroup(group).then((response) => {
      if (response.status === 201) {
        window.location.replace("/groups");
      }
    });
  }
}
