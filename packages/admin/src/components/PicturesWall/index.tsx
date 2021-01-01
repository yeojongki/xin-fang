import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IOSSSignature } from '@xf/common/src/interfaces/oss-signature.interface';
import { HttpSuccessResponse } from '@xf/common/src/interfaces/http.interface';
import { getSignature } from '@/utils/oss-upload';
import styles from './style.less';
import { getFileList } from './utils';

interface IPreviewFile extends UploadFile {
  preview?: string;
}

interface IState {
  previewVisible: boolean;
  previewImage: string;
  OSSData: IOSSSignature | null;
}

interface IProps {
  /** 类别 dir 不能以 `/` 结尾 */
  dir?: string;
  fileList?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  /** default 9 */
  maxLength?: number;
  previewWidth?: string;
}

export type IUploadFile = Omit<UploadFile, 'response'> & {
  response?: string | HttpSuccessResponse<{ filename: string }>;
};

function getBase64(file: UploadFile['originFileObj']): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export class PicturesWall extends React.Component<IProps, IState> {
  state: IState = {
    previewVisible: false,
    previewImage: '',
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

  generateFilename = (file: any): string => {
    const { OSSData } = this.state;
    const { dir = '' } = this.props;
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;

    if (OSSData) {
      // OSSData.dir 为此人的文件夹, props.dir 为类别的 dir 如 house avatar
      return `${OSSData.dir}${dir}/${filename}`;
    }
    return `error/${filename}`;
  };

  handleChange = ({ file, fileList }: UploadChangeParam) => {
    if (file.status === 'error') {
      message.error('上传出错，请重试');
    }
    const { onChange } = this.props;
    onChange && onChange(fileList);
  };

  handleRemove = (file: UploadFile) => {
    const { fileList = [], onChange } = this.props;
    const files = getFileList(fileList).filter((v) => v.url !== file.url);
    onChange && onChange(files);
  };

  getExtraData = (file: any) => {
    const { OSSData } = this.state;
    if (OSSData) {
      return {
        key: this.generateFilename(file),
        OSSAccessKeyId: OSSData.OSSAccessKeyId,
        policy: OSSData.policy,
        signature: OSSData.signature,
        success_action_status: 200,
        callback: OSSData.callback,
      };
    }
    return undefined;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: IPreviewFile) => {
    let preview = file.url ? file.url : file.preview;
    if (!preview) {
      preview = await getBase64(file.originFileObj);
      file.preview = file.preview;
    }

    this.setState({
      previewImage: preview || '',
      previewVisible: true,
    });
  };

  render() {
    const { previewVisible, previewImage, OSSData } = this.state;
    const { maxLength = 9, previewWidth = '800px' } = this.props;
    let { fileList = [] } = this.props;
    // transform fileList if is string
    fileList = getFileList(fileList);

    const uploadIcon = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <>
        <Upload
          accept="image/png, image/jpg, image/jpeg, image/gif"
          multiple
          listType="picture-card"
          action={OSSData ? OSSData.host : '#'}
          fileList={fileList}
          data={this.getExtraData}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          beforeUpload={this.beforeUpload}
        >
          {fileList.length >= maxLength ? null : uploadIcon}
        </Upload>
        <Modal
          title="查看大图"
          width={previewWidth}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="preview" className={styles.preview} src={previewImage} />
        </Modal>
      </>
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
