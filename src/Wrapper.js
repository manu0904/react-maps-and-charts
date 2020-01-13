import React, { Component } from 'react';
import App from './app';

import axios from 'axios'

export default class Wrapper extends Component {
  state = {
      isMobileView: false,
      selectedFile: null,
      uploaded: false,
      useDefault: false,
      clicked: false,
      flnm: ""
    }

  componentDidMount() {
    if (document.documentElement.clientWidth <= 700 || document.documentElement.clientHeight <=500) {
      this.setState({ isMobileView: true })
    } else {
      this.setState({ isMobileView: false })
    }
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (document.documentElement.clientWidth <= 700 || document.documentElement.clientHeight <=500) {
      this.setState({ isMobileView: true })
    } else {
      this.setState({ isMobileView: false })
    }
  }

  handleChange = e => {
    this.setState({ selectedFile: e.target.files[0], flnm: e.target.files[0].name })
  }

  handleUseDefault = (e) => {
    this.setState({ useDefault: true });
  }

  handleUpload = (e) => {
    e.preventDefault();
    if (!this.state.selectedFile) {
      alert('Please choose a file!');
      return;
    }
    console.log(this.state.selectedFile);
    this.setState({ clicked: true }, () => {

      const data = new FormData();
      const isCsv = this.state.selectedFile.name.split('.')[1] === 'csv';

      if (isCsv) {
        data.append('file', this.state.selectedFile)
        axios.post('/api/upload', data).then(res => {
          this.setState({
            uploaded: true
          })
          console.log(res.statusText)
        }).catch(e => console.log(e));
      }
      else {
        this.setState({ selectedFile: null, flnm: "" });
        alert('Please enter csv file');
      }
      
    })
  }

  render() {
    console.log("wrapper rendering");

    return (
      <>
        {
          this.state.isMobileView ? (
            <div className="upload-form-wrapper">
              <p>Please open it in bigger window.</p>
            </div>
          ) : (
              (this.state.uploaded || this.state.useDefault) ? (
                <App choice={this.state.uploaded ? 1 : 2} />
              ) : (
                  <div className="upload-form-wrapper">
                    <div className="heading">ProjectX</div>
                    <div className="upload-form">
                      <input onChange={this.handleChange} type="file" name="selectedFile" id="file" className="inputfile" data-multiple-caption="{count} files selected" multiple />
                      <label htmlFor="file">{this.state.flnm.length ? this.state.flnm : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg>}</label>
                      <button onClick={this.handleUpload} > {!this.state.clicked ? "Upload" : <span className="spinner"></span>} </button>
                    </div>
                    <p>OR</p>
                    <div className="">
                      <button style={{ backgroundColor: "#d3394c" }} onClick={this.handleUseDefault} > Use Provided Data </button>
                    </div>
                  </div>
                )
            )
        }
      </>
    )
  }
}
