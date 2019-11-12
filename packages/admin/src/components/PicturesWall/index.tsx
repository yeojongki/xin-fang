import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IOSSSignature } from '@xf/common/src/interfaces/oss-signature.interface';
import { getSignature } from '@/utils/oss-upload';

interface IPreviewFile extends UploadFile {
  preview?: string;
}

interface IState {
  previewVisible: boolean;
  previewImage: string;
  fileList: UploadFile[];
  OSSData: IOSSSignature | null;
}

function getBase64(file: UploadFile['originFileObj']): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export class PicturesWall extends React.Component<null, IState> {
  state: IState = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    OSSData: null,
  };

  init = async () => {
    try {
      const OSSData = await getSignature();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  // any type for fix eslint...
  beforeUpload = async (): Promise<any> => {
    const { OSSData } = this.state;

    if (OSSData) {
      const expire = new Date(OSSData.expiration);

      if (+expire < Date.now() || !OSSData) {
        await this.init();
      }
      return true;
    }

    await this.init();
    return true;
  };

  transformFile = file => {
    const { OSSData } = this.state;

    if (OSSData) {
      const suffix = file.name.slice(file.name.lastIndexOf('.'));
      const filename = Date.now() + suffix;
      file.url = OSSData.dir + filename;
    }
    return file;
  };

  generateFilename = (file: any): string => {
    const { OSSData } = this.state;
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;

    if (OSSData) {
      return `${OSSData.dir}${filename}`;
    }
    return `error/${filename}`;
  };

  handleChange = ({ fileList }: UploadChangeParam) => this.setState({ fileList });

  getExtraData = (file: any) => {
    const { OSSData } = this.state;
    if (OSSData) {
      return {
        key: this.generateFilename(file),
        OSSAccessKeyId: OSSData.OSSAccessKeyId,
        policy: OSSData.policy,
        signature: OSSData.signature,
        success_action_status: 200,
      };
    }
    return undefined;
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

  render() {
    const { previewVisible, previewImage, fileList, OSSData } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={OSSData ? OSSData.host : '#'}
          listType="picture-card"
          fileList={fileList}
          data={this.getExtraData}
          transformFile={this.transformFile}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
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
