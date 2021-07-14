import React, { useState, useEffect } from "react";
import { getGroupTasks } from "../../../api/group.requests";
import { Link } from "react-router-dom";

export default function GroupTasksContainer({ match: { params } }) {
  const [tasks, setTasks] = useState([]);

  const { id } = params;

  useEffect(() => {
    getGroupTasks(id).then((response) => {
      if (response.status === 403) window.location.replace('/');
      setTasks(response.data);
    });
  }, [id]);

  return (
    <div className="mt-3">
      <h1>Tareas del grupo: { tasks.length && tasks[0].group.name }</h1>
      <div className="row mt-3">
        {tasks.map((task) => (
          <div key={task.id} className="col-auto">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5 className="card-title text-uppercase text-muted mb-0">
                        {task.status.name}
                      </h5>
                      <div className="dropdown">
                        <a
                          className="btn btn-sm btn-icon-only text-light"
                          href="#"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-bottom dropdown-menu-arrow">
                          <Link
                            to={`/tasks/${task.id}/edit`}
                            className="dropdown-item"
                          >
                            Editar
                          </Link>
                        </div>
                      </div>
                    </div>
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
