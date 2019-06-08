import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { updateMeta } from "../../store/actions/metaActions";

class Select extends Component {
  constructor(props) {
    super(props);
    this.selectField = React.createRef;
  }
  onChange = e => {
    const { fieldLabel, fieldName, types } = this.props.type;
    const selected = e.target.value;

    this.props.updateMeta({
      fieldLabel,
      fieldName,
      fieldValue: selected,
      types
    });
  };
  render() {
    const { fieldLabel, fieldName, fieldValue, types } = this.props.type;
    let counter = 0;
    const options = types.map(type => {
      return <option key={++counter}>{type}</option>;
    });
    return (
      <Form.Group>
        <Form.Label>{fieldName}</Form.Label>
        <Form.Control
          ref={this.selectField}
          defaultValue={fieldValue}
          id={fieldLabel}
          as="select"
          onChange={this.onChange}
        >
          {options}
        </Form.Control>
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
    type: state.meta.type
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
