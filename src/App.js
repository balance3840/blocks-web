import React from 'react';
import { ContextProvider } from './provider/provider';
import TestContainer from './containers/TestContainer';

export default function App() {
  return (
    <ContextProvider>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <p>
          <strong>Migrated from Redux to React Context Provider</strong>
        </p>
        <TestContainer />
      </div>
    </ContextProvider>
  );
}
