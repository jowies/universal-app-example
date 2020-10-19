import React from 'react';

interface Props {
  runtime: string;
}

const App: React.FC<Props> = ({ runtime }) => {
  return <div>Dette kjører {runtime}</div>;
};

export default App;
