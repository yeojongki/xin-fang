import React from 'react';
import { Tag, Input, Icon, Button } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

interface Props {
  value?: string[];
  tagName?: string;
  onChange?: (tags: string[]) => any;
}

interface State {
  inputVisible: boolean;
  inputValue: string;
}

export class EditableTagGroup extends React.Component<Props, State> {
  input: Input | null = null;

  state: State = {
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag: string) => {
    const tags = this.props.value!.filter((tag) => tag !== removedTag);
    this.props.onChange && this.props.onChange(tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => {
      this.input!.focus();
    });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { value } = this.props;
    if (inputValue && value!.indexOf(inputValue) === -1) {
      value = [...value!, inputValue];
    }

    this.props.onChange && this.props.onChange(value!);

    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = (input: Input | null) => {
    this.input = input;
  };

  forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e: any) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { value = [], tagName } = this.props;
    const { inputVisible, inputValue } = this.state;
    const tagChild = value.map(this.forMap);
    return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: (e) => {
                /* eslint-disable-next-line */
                // @ts-ignore
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Button
            size="small"
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> {tagName || 'Add Tag'}
          </Button>
        )}
      </div>
    );
  }
}
