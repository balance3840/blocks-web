import React, { useEffect, Fragment, useState } from "react";
import connect from "../../provider/connect";
import {
  getGroups,
  getGroupsSuccess,
  getGroupsFailure,
} from "../../actions/group.actions";
import { getGroupsRequest } from "../../api/group.requests";

import Loader from "react-loader-spinner";

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

function render(groups) {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col">
          <div className="card">
            <div className="card-header border-0">
              <h3 className="mb-0">Mis grupos</h3>
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
                    <th scope="col" className="sort" data-sort="tipo">
                      tipo
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="list">
                  {groups.map((group) => (
                    <tr>
                      <th scope="row">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <span className="name mb-0 text-sm">
                              {group.name}
                            </span>
                          </div>
                        </div>
                      </th>
                      <td>{group.description}</td>
                      <td>{group.grade}</td>
                      <td>{group.level}</td>
                      <td>{group.stage_id}</td>
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
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <a className="dropdown-item" href="#">
                              Something else here
                            </a>
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
        </div>
      </div>
    </React.Fragment>
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
