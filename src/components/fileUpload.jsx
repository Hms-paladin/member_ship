import React, { Component } from "react";
import { Upload, Icon, Modal } from 'antd';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class ImagesUpload extends React.Component {

  constructor(props) {
    console.log("props", props)
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewIndex: null,
      radioChecked: false,
      fileList: props.sendData ? props.sendData : [],
      deleteList: [],
      imgSize: true
    };
  }

  handleCancel = () => this.setState({ previewVisible: false, previewIndex: null })

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'video/mp4';
    if (!isJpgOrPng) {
      alert('You can only upload JPG/PNG/MP4 file!');
    }
    var isLt2M = true;

    if (file.type === 'video/mp4') {
      isLt2M = file.size / 1024 / 1024 < 5;
    }
    if(file.type === 'image/jpeg' || file.type === 'image/png'){
      isLt2M = file.size / 1024 / 1024 < 2;
    }

    if (!isLt2M) {
      this.setState({ imgSize: false })
      alert(file.type === 'video/mp4' ? "Video Size Must Lesser than 5MB" : "Image Size Must Lesser than 2MB")
    }else{
      this.setState({ imgSize: true })
    }

    if(!isJpgOrPng){
      this.setState({imgSize:false})
    }
  }


  handlePreview = (file) => {
    console.log("filePreview", file)

    // var radioChecked=file.originFileObj.loadImage && file.originFileObj.loadImage==1?true:false;

    // var previewIndex = this.state.fileList.findIndex(x => x ===file);


    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      // previewIndex,radioChecked,
    });
  }


  handleRemove = (file) => {
    console.log(file)
    var deleteList = this.state.deleteList;
    var fileList = this.state.fileList;
    if (file.hasOwnProperty('editStatus') && file.editStatus == true) {
      deleteList.push(file);
    }
    var previewIndex = fileList.findIndex(x => x === file);
    fileList.splice(previewIndex, 1);
    this.setState({ deleteList, fileList });

  }
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = ({ fileList }) => {
    if (this.state.imgSize) {
      this.setState({ fileList })
    }
  }

  closeUpload = () => {

    this.props.closeUpload(this.state.fileList, this.state.deleteList);

  }

  radioClick = () => {
    var index = this.state.previewIndex;
    var fileList = this.state.fileList;
    var radioChecked = this.state.radioChecked;
    radioChecked = true;

    fileList.map((item, i) => {

      if (i === index) {
        item.originFileObj.loadImage = 1;
      } else {
        item.originFileObj.loadImage = 0;
      }

    })
    this.setState({ fileList, radioChecked })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Grid item xs={4} md={4}>
          <div>
            <div className="clearfix" style={{
              marginTop: "10px",
              marginBottom: "10px"
            }}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onRemove={this.handleRemove}
                onChange={this.handleChange}
                multiple={true}
                beforeUpload={this.beforeUpload}
              >
                {fileList.length >= 15 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} >
                <div style={{ width: '100%', height: '100%' }}>
                  <img alt="example" src={previewImage} style={{ width: '100%', height: '100%' }} />
                </div>
                <input type='radio' checked={this.state.radioChecked} onClick={this.radioClick} />
              </Modal>
            </div>
          </div>
        </Grid>
        <label className="text-danger">Video Size Must Lesser than 5MB / Image Size Must Lesser than 2MB</label>

        <div>
          <Button style={{ marginRight: "10px" }} type="button" color="primary" onClick={this.closeUpload} variant="contained">Done</Button>
          <Button style={{ marginRight: "10px" }} type="button" color="primary" onClick={() => this.props.closePopup()} variant="contained">Close</Button>
        </div>
      </div>
    );
  }
}

export default ImagesUpload;