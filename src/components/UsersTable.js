import React from "react";
import { Link } from "react-router-dom";

export default function UsersTable({ users }) {
  return (
    <div className="card">
      <div className="card-header border-0 d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-0">Mis usuarios</h3>
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
                apellido
              </th>
              <th scope="col" className="sort" data-sort="grado">
                email
              </th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody className="list">
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <span className="name mb-0 text-sm">{user.name}</span>
                    </div>
                  </div>
                </th>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
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
                      <Link to={`/users/${user.id}/edit`} className="dropdown-item">
                        Editar usuario
                      </Link>
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
