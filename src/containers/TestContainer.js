import * as React from "react";
import { setName } from "../actions/user.actions";
import connect from "../provider/connect";

/**
 * holds all content related to Container 1 and its
 * connected to the store and its in charge of updating
 * state thru userReducer
 */
const TestContainer = ({ name, dispatchSetName }) => {
  return (
    <article>
      <hr />
      <h1>Connected Container #1</h1>
      <p>
        <strong>
          This container dispatch actions to one of the two reducers
        </strong>
      </p>
      <p>
        Name:{" "}
        <strong>
          {name}
        </strong>
      </p>
      <input type="text" value={name} onChange={e => dispatchSetName(e.target.value)} />
    </article>
  );
};

/**
 * a factory function that connects to the provider
 *
 * @param {object} state The state found in the provider's state
 * @returns object
 */
const mapStateToProps = state => {
  return {
    name: state.user.name
  };
};

/**
 * a factory function of methods that disoatches actions to the provider
 *
 * @param {function} dispatch Main dispatch function that updates the provider
 */
const mapDispatchToProps = dispatch => {
  return {
    dispatchSetName: name => dispatch(setName(name))
  };
};

/**
 * A Higher Order Function that
 * connects the component to the provider
 *
 * @param {function} Component A React Component that will be connected to the provider
 */
const withConnect = Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);

export default withConnect(TestContainer);