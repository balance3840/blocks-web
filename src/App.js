import React from 'react';
import { ContextProvider } from './provider/provider';
import TestContainer from './containers/TestContainer';
import Root from './containers';

export default function App() {
  return (
    <ContextProvider>
      <Root />
    </ContextProvider>
  );
}
