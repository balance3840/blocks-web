import React, { useState, useEffect } from "react";
import { getGroupTasks } from "../../../api/group.requests";

export default function GroupTasksContainer({ match: { params } }) {
  const [tasks, setTasks] = useState([]);

  const { id } = params;

  useEffect(() => {
    getGroupTasks(id).then((response) => {
      setTasks(response.data);
    });
  }, [id]);

  return (
    <div className="mt-3">
      <h1>Tareas del grupo</h1>
      <div className="row mt-3">
        {tasks.map((task) => (
          <div key={task.id} className="col-auto">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">
                      {task.status.name}
                    </h5>
                    <span className="h2 font-weight-bold mb-0">
                      {task.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
