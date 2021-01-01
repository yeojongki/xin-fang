import React from 'react';
import { Tooltip } from 'antd';
import styles from './style.less';

export interface ITooltipColumn {
  text: string | number;
  width: string;
}

export default ({ text, width }: ITooltipColumn) => (
  <Tooltip title={text}>
    <div
      className={styles.ellipsis}
      style={{
        width,
      }}
    >
      {text}
    </div>
  </Tooltip>
);
