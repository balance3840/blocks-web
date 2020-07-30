import React, { useState, useEffect } from "react";
import TaskForm from "../../../components/TaskForm";
import { getGroup } from "../../../api/group.requests";
import { createTask } from "../../../api/task.request";
import { isTeacher } from "../../../utils/misc";

export default function GroupTaskCreateContainer({ match: { params } }) {
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

  function onSubmit(task) {
    createTask(task).then((response) => {
      if (response.status === 201) {
        window.location.replace("/groups");
      }
    });
  }

  return group ? <TaskForm group={group} onSubmit={onSubmit} /> : "";
}
