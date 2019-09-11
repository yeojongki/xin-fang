import React from 'react';
import moment from 'moment';

interface IDateCoumnProps {
  date: Date;
  format?: string;
}

export default ({ date, format = 'YYYY/MM/DD HH:mm' }: IDateCoumnProps): JSX.Element => (
  <> {moment(date).format(format)}</>
);
