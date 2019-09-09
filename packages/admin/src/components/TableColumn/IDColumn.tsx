import React from 'react';
import { Tooltip } from 'antd';
import { IID } from '@xf/common/src/interfaces/id.interface';

export default ({ id }: IID) => (
  <Tooltip title={id}>
    <div
      style={{
        width: '60px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {id}
    </div>
  </Tooltip>
);
