import "./Meta.scss";
import React, { Component } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { connect } from "react-redux";
import InputField from "./InputField";

class MetaFields extends Component {
  /**
   * Each (simple) form is autogenerated. Simple means the form-field does receive a string as input.
   * Does not apply to DateTime & Enum (dropdown)
   * @param {Object} fields - props passed from redux
   */
  generateInputFields = fields => {
    const mappedFields = [];
    let key = 0;
    Object.entries(fields).forEach(field => {
      mappedFields.push(<InputField key={++key} props={field[1]} />);
    });
    return mappedFields;
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="col-md-6 meta_body">
            <Form>{this.generateInputFields(this.props.fields)}</Form>
          </Col>
          {/** TODO: Implement Time Field */}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    fields: state.meta
  };
};

export default connect(mapStateToProps)(MetaFields);
