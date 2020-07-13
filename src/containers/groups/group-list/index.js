import React, { useEffect, useState } from "react";
import connect from "../../../provider/connect";
import {
  getGroups,
  getGroupsSuccess,
  getGroupsFailure,
} from "../../../actions/group.actions";
import { getGroupsRequest } from "../../../api/group.requests";

import Loader from "react-loader-spinner";
import GroupsTable from "../../../components/GroupsTable";

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

export default withConnect(GroupListContainer);

function renderLoading() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
    </div>
  );
}

function render(groups) {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col">
          <GroupsTable groups={groups} />
        </div>
      </div>
    </React.Fragment>
  );
}

function GroupListContainer({
  groups,
  loading,
  dispatchGetGroups,
  dispatchGetGroupsSuccess,
  dispatchgetGroupsFailure,
}) {
  const [groupsLength, setGroupsLength] = useState();

  useEffect(() => {
    dispatchGetGroups();
    getGroupsRequest().then((response) => {
      if (response && response.data) {
        setGroupsLength(response.data.length);
        dispatchGetGroupsSuccess(response.data);
        return;
      }
      dispatchgetGroupsFailure(response.message);
    });
    return () => {};
  }, [groupsLength]);

  return loading ? renderLoading() : render(groups);
}
