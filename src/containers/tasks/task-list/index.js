import React, { useEffect, useState } from "react";
import { isAdmin } from "../../../utils/misc";
import Loader from "../../../components/Loader";
import { getTasksRequest } from "../../../api/task.request";
import TasksTable from "../../../components/TasksTable";

export default function TaskListContainer() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const _isAdmin = isAdmin();
  const onlyMine = _isAdmin ? false : true;

  useEffect(() => {
    getTasksRequest(onlyMine).then((response) => {
      setTasks(response.data);
    });
    setLoading(false);
  }, []);

  function renderLoading() {
      return <Loader />
  }

  function renderContent() {
      return (
        <div className="row mt-5">
        <div className="col">
          <TasksTable tasks={tasks} />
        </div>
      </div>
      )
  }

  return (
      loading ? renderLoading() : renderContent()
  );
}
