import React, { useEffect, useState } from "react";
import { getTask, editTask } from "../../../api/task.request";
import TaskForm from "../../../components/TaskForm";
import { isTeacher } from "../../../utils/misc";

export default function TaskEditContainer({ match: { params } }) {
  const [task, setTask] = useState(null);
  const { id } = params;
  const _isTeacher = isTeacher();
  const onlyMineTasks = _isTeacher ? true : false;

  useEffect(() => {
    if (!task) {
      getTask(id).then((response) => {
        setTask(response.data);
      });
    }
  });

  return task ? <TaskForm task={task} group={task.group} onSubmit={onSubmit} /> : "";

  function onSubmit(task) {
      editTask(id, task, onlyMineTasks).then(response => {
          if(response.status === 200) {
              window.location.replace(`/groups/${task.group_id}/tasks`);
          }
      });
  }

}
