import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { updateMeta } from "../../store/actions/metaActions";

const InputField = ({ props, updateMeta }) => {
  const { fieldLabel, fieldName, fieldValue, isRequired } = props;

  const onChange = e => {
    updateMeta({
      fieldLabel,
      fieldName,
      fieldValue: e.target.value,
      isRequired
    });
  };

  return (
    <Form.Group>
      <Form.Label>{fieldName}</Form.Label>
      <Form.Control
        required={isRequired}
        id={fieldLabel}
        // placeholder={fieldName}
        value={fieldValue}
        onChange={onChange}
      />
    </Form.Group>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateMeta: state => {
      dispatch(updateMeta(state));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(InputField);
