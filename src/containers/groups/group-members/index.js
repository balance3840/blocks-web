import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGroupMembers } from "../../../api/group.requests";

export default function GroupMembersContainer({ match: { params } }) {
  const [members, setMembers] = useState([]);
  const { id } = params;

  useEffect(() => {
    getGroupMembers(id).then((response) => {
      if (response.status === 403) window.location.replace('/');
      setMembers(response.data);
    });
  }, [id]);

  return (
    <div className="mt-3">
      <h1>Miembros del grupo</h1>
      <div className="row mt-3">
        {members.map((member) => (
          <div key={member.id} className="col-auto">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="card-title text-uppercase text-muted mb-0">
                        {member.role.name}
                      </h5>
                      <div className="dropdown">
                        <a
                          className="btn btn-sm btn-icon-only text-light mr-0 ml-0 border"
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
                            to={`/users/${member.id}/edit`}
                            className="dropdown-item"
                          >
                            Editar
                        </Link>
                        </div>
                      </div>
                    </div>
                    <span className="h2 font-weight-bold mb-0">{member.name} {member.lastname}</span>
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
