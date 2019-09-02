// import React, { FC, useState } from 'react';
// import { Form, Modal } from 'antd';
// import { FormComponentProps } from 'antd/es/form';
// import { IRole } from '@xf/common/src/interfaces/role.interfaces';

// interface IUpdateFormProps extends FormComponentProps {
//   visible: boolean;
//   handleUpdateVisible: (visible: boolean) => void;
//   handleOk: () => void;
// }

// const FormItem = Form.Item;

// const UpdateForm: FC<IUpdateFormProps> = ({ visible, handleUpdateVisible,handleOk }) => {
//   const [formVals, setFormVals] = useState<IRole>()

//   return (
//     <Modal
//       destroyOnClose
//       visible={visible}
//       title="编辑角色"
//       onOk={handleOk}
//       onCancel={() => handleUpdateVisible(false)}
//     >
//       <FormItem label="">

//       </FormItem>

//     </Modal>
//   );
// };

// UpdateForm.defaultProps = {
//   handleUpdateVisible: () => {},
// };

// export default Form.create<IUpdateFormProps>()(UpdateForm);
