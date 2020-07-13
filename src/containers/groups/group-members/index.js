import React, { useState, useEffect } from "react";
import { getGroupMembers } from "../../../api/group.requests";

export default function GroupMembersContainer({ match: { params } }) {
  const [members, setMembers] = useState([]);

  const { id } = params;

  useEffect(() => {
    getGroupMembers(id).then((response) => {
      setMembers(response.data);
    });
  }, [id]);

  return (
    <div className="mt-3">
      <h1>Miembros del grupo</h1>
      <div className="row mt-3">
        {members.map((member) => (
          <div className="col-auto">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">
                      {member.role.name}
                    </h5>
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
