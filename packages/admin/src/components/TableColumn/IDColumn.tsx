import React from 'react';
import { IID } from '@xf/common/src/interfaces/id.interface';
import TooltipColumn from './TooltipColumn';

export default ({ id }: IID) => <TooltipColumn text={id} width="60px" />;
