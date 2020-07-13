import React, { useState, useEffect } from "react";
import GroupForm from "../../../components/GroupForm";
import { editGroup, getGroup } from "../../../api/group.requests";

export default function GroupEditContainer({ match: { params } }) {
  const [group, setGroup] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (!group) {
      getGroup(id).then((group) => {
        setGroup(group.data);
      });
    }
  });

  return group ? <GroupForm group={group} onSubmit={onSubmit} /> : '';

  function onSubmit(group) {
    editGroup(id, group).then((response) => {
      if (response.status === 200) {
        window.location.replace("/groups");
      }
    });
  }
}
