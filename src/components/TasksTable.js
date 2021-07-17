import React from "react";
import { Link } from "react-router-dom";
import { isAdmin, isTeacher } from "../utils/misc";

export default function TasksTable({ tasks }) {
  const _isAdmin = isAdmin();
  const _isTeacher = isTeacher();
  const canEdit = _isAdmin || _isTeacher;

  return (
    <div className="card">
      <div className="card-header border-0 d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-0">Mis tareas</h3>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table align-items-center table-flush">
          <thead className="thead-light">
            <tr>
              <th scope="col" className="sort" data-sort="nombre">
                nombre
              </th>
              <th scope="col" className="sort" data-sort="descripcion">
                descripcion
              </th>
              <th scope="col" className="sort" data-sort="grado">
                grupo
              </th>
              <th scope="col" data-sort="nivel">
                estatus
              </th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody className="list">
            {tasks.map((task) => (
              <tr key={task.id}>
                <th scope="row">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <span className="name mb-0 text-sm">{task.title}</span>
                    </div>
                  </div>
                </th>
                <td>{task.description}</td>
                <td>{task.group.name}</td>
                <td>{task.status.name}</td>
                <td className="text-right">
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
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                      <Link to={`/tasks/${task.id}/workspace`} className="dropdown-item">
                        Resolver tarea
                      </Link>
                      {canEdit && (
                        <Link to={`/tasks/${task.id}/edit`} className="dropdown-item">
                          Edtar tarea
                        </Link>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer py-4">
        <nav aria-label="...">
          <ul className="pagination justify-content-end mb-0">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex={-1}>
                <i className="fas fa-angle-left" />
                <span className="sr-only">Previous</span>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2 <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                <i className="fas fa-angle-right" />
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
