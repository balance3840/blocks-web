import React, { useState, useEffect } from "react";
import { getStages } from "../../../api/stage.requests";
import GroupForm from "../../../components/GroupForm";
import { createGroup } from "../../../api/group.requests";

export default function GroupCreateContainer() {
  
  return <GroupForm onSubmit={onSubmit} />;

  function onSubmit(group) {
    createGroup(group).then((response) => {
      if (response.status === 201) {
        window.location.replace("/groups");
      }
    });
  }
}
