import React from "react";
import { Link } from "react-router-dom";
import { isAdmin, isTeacher } from "../utils/misc";

export default function GroupsTable({ groups }) {
  const _isAdmin = isAdmin();
  const _isTeacher = isTeacher();

  return (
    <div className="card">
      <div className="card-header border-0 d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-0">Mis grupos</h3>
        </div>
        {(_isAdmin || _isTeacher) && (
          <div>
            <Link to={"/groups/create"} className="btn btn-primary">
              Crear grupo
            </Link>
          </div>
        )}
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
                grado
              </th>
              <th scope="col" data-sort="nivel">
                nivel
              </th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody className="list">
            {groups.map((group) => (
              <tr key={group.id}>
                <th scope="row">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <span className="name mb-0 text-sm">{group.name}</span>
                    </div>
                  </div>
                </th>
                <td>{group.description}</td>
                <td>{group.grade}</td>
                <td>{group.stage.name}</td>
                {(_isTeacher || _isAdmin) && (
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
                        <Link
                          to={`/groups/${group.id}/members`}
                          className="dropdown-item"
                        >
                          Ver miembros
                        </Link>
                        <Link
                          to={`/groups/${group.id}/edit`}
                          className="dropdown-item"
                        >
                          Editar
                        </Link>
                        <Link
                          to={`/groups/${group.id}/tasks/add`}
                          className="dropdown-item"
                        >
                          Crear tarea
                        </Link>
                        <Link
                          to={`/groups/${group.id}/tasks`}
                          className="dropdown-item"
                        >
                          Ver tareas
                        </Link>
                        <Link
                          to={`/groups/${group.id}/members/add`}
                          className="dropdown-item"
                        >
                          Añadir usuarios
                        </Link>
                      </div>
                    </div>
                  </td>
                )}
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
