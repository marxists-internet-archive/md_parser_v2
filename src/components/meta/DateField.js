import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import { updateMeta } from "../../store/actions/metaActions";
import { transformDate } from "../helpers";
import moment from "moment";
import "moment/locale/ru";

class DateField extends Component {
  constructor(props) {
    super(props);
    this.dateField = React.createRef();
    this.state = {
      alertVariant: "info",
      alertResult: "",
      alertVisibility: "invisible"
    };
  }

  componentDidMount() {
    this.onChange();
  }

  onChange = () => {
    const { fieldLabel, fieldName, isRequired } = this.props.date;

    const currentValue = this.dateField.current.value;
    const readableDate = transformDate(currentValue, moment);
    const errorMessage = `Пожалуйста введите правильный формат числа! Например 1917 или 1917-11 или 1917-11-07`;

    this.props.updateMeta({
      fieldLabel,
      fieldName,
      fieldValue: currentValue,
      dateResult: readableDate,
      isRequired
    });

    if (!currentValue) {
      this.setState({
        alertVisibility: "invisible",
        alertResult: ""
      });
    } else if (readableDate === "ERROR") {
      this.setState({
        alertVisibility: "visible",
        alertVariant: "danger",
        alertResult: errorMessage
      });
    } else if (readableDate !== "") {
      this.setState({
        alertVisibility: "visible",
        alertVariant: "info",
        alertResult: readableDate
      });
    }
  };

  render() {
    const { fieldLabel, fieldName, fieldValue, isRequired } = this.props.date;
    const { alertVisibility, alertVariant, alertResult } = this.state;
    return (
      <Form.Group>
        <Form.Label>{fieldName}</Form.Label>
        <Form.Control
          ref={this.dateField}
          required={isRequired}
          id={fieldLabel}
          value={fieldValue}
          onChange={this.onChange}
        />
        <Alert className={alertVisibility + " mt-2"} variant={alertVariant}>
          <div dangerouslySetInnerHTML={{ __html: alertResult }} />
        </Alert>
      </Form.Group>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMeta: state => {
      dispatch(updateMeta(state));
    }
  };
};

const mapStateToProps = state => {
  return {
    date: state.meta.date,
    dateResult: state.meta.dateResult
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateField);
