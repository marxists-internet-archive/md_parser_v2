import React, { Component } from "react";
import { ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import DownloadMD from "./DownloadMD";
import Upload from "./Upload";

export default class DropdownToolbar extends Component {
  componentDidMount() {
    this.setButtonStyles();
  }

  /** У меня не получилось переписать в данном случае css стили кнопки,
   * поэтому исполюзую встроенные стили, поскольку у них приоритет выше.
   */
  setButtonStyles = () => {
    const elem = document.getElementById("toolDropDown");
    elem.children[0].children[0].style.cssText =
      "padding: 0.05rem 0.5rem; font-size:12px; height: 24px; margin-right: 8px;";
  };

  render() {
    return (
      <ButtonToolbar
        id="toolDropDown"
        className="dropdown-toolbar d-none d-sm-none d-md-block"
      >
        <DropdownButton variant="secondary" title="Инструменты">
          <DownloadMD />
          <Upload />
          <Dropdown.Item
            onClick={() => {
              alert("Sorry, not implemented yet!");
            }}
          >
            Скачать HTML
          </Dropdown.Item>
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}
