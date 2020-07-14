import React, { useState, useEffect } from "react";
import TaskForm from "../../../components/TaskForm";
import { getGroup } from "../../../api/group.requests";
import { createTask } from "../../../api/task.request";

export default function GroupTaskCreateContainer({ match: { params } }) {
  const [group, setGroup] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (!group) {
      getGroup(id).then((group) => {
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
