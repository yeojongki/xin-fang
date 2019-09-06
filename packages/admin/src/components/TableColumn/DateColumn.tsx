import React from 'react';
import dayjs from 'dayjs';

interface IDateCoumnProps {
  date: Date;
  format?: string;
}

export default ({ date, format = 'YYYY/MM/DD hh:mm' }: IDateCoumnProps): JSX.Element => (
  <> {dayjs(date).format(format)}</>
);
