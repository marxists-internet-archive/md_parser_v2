import React, { Component } from "react";
import { Dropdown, Button, Modal } from "react-bootstrap";

/** TODO: implement upload */
class Upload extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <div>
        <Dropdown.Item onClick={this.handleShow}>Загрузить</Dropdown.Item>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Загрузить Файл</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Загрузить файл формата .md и начать работу с ним.
            <div>
              <div className="input-group mb-3 mt-3">
                <div className="custom-file">
                  <input
                    onChange={e => console.log(e.target.value)}
                    type="file"
                    className="custom-file-input"
                  />
                  <label className="custom-file-label">Выбрать Файл</label>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Отменить
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Загрузить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Upload;
