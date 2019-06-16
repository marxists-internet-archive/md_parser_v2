import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import { updateMeta, updateAlert } from "../../store/actions/metaActions";
import { renderDateAlert } from "../helpers";
import moment from "moment";
import "moment/locale/ru";

class DateField extends Component {
  constructor(props) {
    super(props);
    this.dateField = React.createRef();
  }

  componentDidMount() {
    this.onChange();
  }

  onChange = () => {
    const { fieldLabel, fieldName } = this.props.date;
    const currentValue = this.dateField.current.value;

    this.props.updateMeta({
      fieldLabel,
      fieldName,
      fieldValue: currentValue
    });

    this.props.updateAlert(renderDateAlert(currentValue, moment));
  };

  render() {
    const { fieldLabel, fieldName, fieldValue, isRequired } = this.props.date;
    const { alertVisibility, alertVariant, alertResult } = this.props.dateAlert;
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
    },
    updateAlert: state => {
      dispatch(updateAlert(state));
    }
  };
};

const mapStateToProps = state => {
  return {
    date: state.meta.date,
    dateAlert: state.date,
    dateResult: state.meta.dateResult
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateField);
