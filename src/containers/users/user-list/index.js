import React, { useState, useEffect } from "react";
import { getUsers } from "../../../api/users.requests";
import { isTeacher } from "../../../utils/misc";
import UsersTable from "../../../components/UsersTable";

export default function UserListContainer() {
  const [users, setUsers] = useState([]);
  const onlyMineUsers = isTeacher();

  useEffect(() => {
    getUsers(onlyMineUsers).then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="row mt-5">
      <div className="col">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
