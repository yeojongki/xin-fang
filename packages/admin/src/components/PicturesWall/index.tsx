import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

interface IPreviewFile extends UploadFile {
  preview?: string;
}

interface IState {
  previewVisible: boolean;
  previewImage: string;
  fileList: UploadFile[];
}

function getBase64(file: UploadFile['originFileObj']): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export class PicturesWall extends React.Component<{}, IState> {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: IPreviewFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview || '',
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }: UploadChangeParam) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

// export const PicturesWall = () => {
//   const [previewVisible, setPreviewVisible] = useState<boolean>(false);
//   const [previewImage, setPreviewImage] = useState<string>('');
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   const uploadButton = (
//     <div>
//       <Icon type="plus" />
//       <div className="ant-upload-text">上传</div>
//     </div>
//   );

//   // preview cancel
//   const handleCancel = () => setPreviewVisible(false);

//   // click img to preview
//   const handlePreview = async (file: IPreviewFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     // '' for fix eslint
//     setPreviewImage(file.url || file.preview || '');
//     setPreviewVisible(true);
//   };

//   // upload file change
//   const handleChange = (info: UploadChangeParam) => {
//     console.log('handleChange', info.fileList)
//     setFileList(info.fileList);
//   };

//   return (
//     <div className="clearfix">
//       <Upload
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 9 ? null : uploadButton}
//       </Upload>
//       <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
//         <img alt="preview" style={{ width: '100%' }} src={previewImage} />
//       </Modal>
//     </div>
//   );
// };
