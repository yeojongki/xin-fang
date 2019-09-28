import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { Permission } from '@xf/common/src/entities';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { TRenderItems } from '@/components/BaseFormWrap';
import { ModuleNameMap } from '@/config';
import style from './style.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

export const Base = (props: TRenderItems<IRole> & { permissions?: Permission[] }) => {
  // props.permissions 为系统所有的权限
  const { initValue, form, type, permissions = [] } = props;
  const { getFieldDecorator } = form;

  console.log('Base', props);

  const permissionsGourp = groupBy(permissions || [], 'module');

  // 当前角色拥有的权限
  const rolePermissions = initValue && initValue.permissions ? initValue.permissions : [];
  const [indeterminate, setIndeterminate] = useState<boolean>(
    !!rolePermissions.length && permissions.length !== rolePermissions.length,
  );
  const [checkAll, setCheckAll] = useState<boolean>(permissions.length === rolePermissions.length);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    setCheckAll(checked);
    setIndeterminate(false);
    form.setFieldsValue(
      checked ? { permissions: permissions.map(p => p.id) } : { permissions: [] },
    );
  };

  const calcCheckAll = useCallback(() => {
    const nowPermissions = form.getFieldValue('permissions');
    if (permissions.length === nowPermissions.length) {
      setCheckAll(true);
      setIndeterminate(false);
    } else if (!!nowPermissions.length && permissions.length !== nowPermissions.length) {
      setIndeterminate(true);
      setCheckAll(false);
    } else {
      setIndeterminate(false);
      setCheckAll(false);
    }
  }, [form.getFieldValue('permissions')]);

  useEffect(() => {
    if (form.getFieldValue('permissions')) {
      calcCheckAll();
    }
  });

  return (
    <>
      {type === 'edit' ? (
        <FormItem style={{ marginBottom: 0 }}>
          {getFieldDecorator('id', {
            initialValue: initValue ? initValue.id : '',
          })(<Input hidden readOnly />)}
        </FormItem>
      ) : null}

      <FormItem label="标识" hasFeedback>
        {getFieldDecorator('token', {
          initialValue: initValue ? initValue.token : '',
          rules: [
            {
              required: true,
              message: '请输入标识！',
            },
          ],
        })(<Input maxLength={16} placeholder="标识" />)}
      </FormItem>

      <FormItem label="名称" hasFeedback>
        {getFieldDecorator('name', {
          initialValue: initValue ? initValue.name : '',
          rules: [
            {
              required: true,
              message: '请输入名称！',
            },
          ],
        })(<Input maxLength={16} placeholder="名称" />)}
      </FormItem>

      <FormItem label="描述" hasFeedback>
        {getFieldDecorator('desc', {
          initialValue: initValue ? initValue.desc : '',
        })(<Input maxLength={16} placeholder="描述" />)}
      </FormItem>

      <FormItem label="配置权限">
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          全选
        </Checkbox>
        {getFieldDecorator('permissions', { initialValue: initValue ? initValue.permissions : [] })(
          <CheckboxGroup>
            {map(permissionsGourp, (group: Permission[], module) => (
              <div key={module} className={style.checkboxRow}>
                <h3>{ModuleNameMap[module]}</h3>
                {group.map(({ id, name }) => (
                  <Checkbox key={id} value={id}>
                    {name}
                  </Checkbox>
                ))}
              </div>
            ))}
          </CheckboxGroup>,
        )}
      </FormItem>
    </>
  );
};
