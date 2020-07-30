import React, { useState, useEffect } from "react";
import GroupForm from "../../../components/GroupForm";
import { editGroup, getGroup } from "../../../api/group.requests";
import { isTeacher } from "../../../utils/misc";

export default function GroupEditContainer({ match: { params } }) {
  const [group, setGroup] = useState(null);
  const { id } = params;
  const _isTeacher = isTeacher();
  const onlyMineGroups = _isTeacher ? true : false;

  useEffect(() => {
    if (!group) {
      getGroup(id, onlyMineGroups).then((group) => {
        if (group.status === 403) window.location.replace('/');
        setGroup(group.data);
      });
    }
  });

  return group ? <GroupForm group={group} onSubmit={onSubmit} /> : '';

  function onSubmit(group) {
    editGroup(id, group).then((response) => {
      if (response.status === 200) {
        window.location.replace("/groups");
      }
    });
  }
}
