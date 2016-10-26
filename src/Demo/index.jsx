import React from 'react';

import sUtils from 'styles/utils';

export default (props) => {
  return (
    <div>
      <h1 className={sUtils.textCenter}>
        Hello world @ src/Demo/index.jsx
      </h1>

      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
