import React, { useEffect, useState } from "react";
import connect from "../../provider/connect";
import {
  getGroups,
  getGroupsSuccess,
  getGroupsFailure,
} from "../../actions/group.actions";
import { getGroupsRequest } from "../../api/group.requests";

import Loader from "react-loader-spinner";
import GroupsTable from "../../components/GroupsTable";
import TasksTable from "../../components/TasksTable";
import TasksResultTable from "../../components/TasksResultTable";
import { getMyStudentsTasks, getTasksRequest } from "../../api/task.request";
import { isAdmin, isTeacher } from "../../utils/misc";

/**
 * a factory function that connects to the provider
 *
 * @param {object} state The state found in the provider's state
 * @returns object
 */
const mapStateToProps = (state) => {
  return {
    groups: state.group.groups,
    loading: state.group.loading,
    error: state.group.error,
  };
};

/**
 * a factory function of methods that disoatches actions to the provider
 *
 * @param {function} dispatch Main dispatch function that updates the provider
 */
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetGroups: () => dispatch(getGroups()),
    dispatchGetGroupsSuccess: (groups) => dispatch(getGroupsSuccess(groups)),
    dispatchgetGroupsFailure: (error) => dispatch(getGroupsFailure(error)),
  };
};

/**
 * A Higher Order Function that
 * connects the component to the provider
 *
 * @param {function} Component A React Component that will be connected to the provider
 */
const withConnect = (Component) =>
  connect(mapStateToProps, mapDispatchToProps)(Component);

export default withConnect(DashboardContainer);

function renderLoading() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
    </div>
  );
}

function render(groups, tasks, myStudentTasks) {
  const _isAdmin = isAdmin();
  const _isTeacher = isTeacher();
  return (
    <>
      {(_isAdmin ||
        _isTeacher) && (
          <div className="row mt-5">
            <div className="col">
              {groups && <GroupsTable groups={groups} />}
            </div>
          </div>
        )}
      <div className="row mt-5">
        <div className="col">
          {tasks && <TasksTable tasks={tasks} />}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          {tasks && (_isAdmin ||
            _isTeacher) && <TasksResultTable tasksResult={myStudentTasks} actionText={'Ver resultado'} />}
        </div>
      </div>
    </>
  );
}

function DashboardContainer({
  groups,
  loading,
  dispatchGetGroups,
  dispatchGetGroupsSuccess,
  dispatchgetGroupsFailure,
}) {
  const [groupsLength, setGroupsLength] = useState();
  const [tasks, setTasks] = useState([]);
  const [myStudentTasks, setMyStudentsTasks] = useState([]);
  const _isAdmin = isAdmin();
  const _isTeacher = isTeacher();
  const onlyMine = _isAdmin ? false : true;
  const onlyMineGroups = _isTeacher ? true : false;

  useEffect(() => {
    dispatchGetGroups();
    getGroupsRequest(onlyMineGroups).then((response) => {
      if (response && response.data) {
        setGroupsLength(response.data.length);
        dispatchGetGroupsSuccess(response.data);
        return;
      }
      dispatchgetGroupsFailure(response.message);
    });
    getTasksRequest(onlyMine).then((response) => {
      setTasks(response.data);
    });
    getMyStudentsTasks().then(response => {
      setMyStudentsTasks(response.data);
    });
    return () => { };
  }, [groupsLength]);

  return loading ? renderLoading() : render(groups, tasks, myStudentTasks);
}
