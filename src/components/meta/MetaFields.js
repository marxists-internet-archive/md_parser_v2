import "./Meta.scss";
import React, { Component } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { connect } from "react-redux";
import InputField from "./InputField";
import DateField from "./DateField";
import { default as TypeMaterial } from "./Select";

class MetaFields extends Component {
  /**
   * Each (simple) form is autogenerated. Simple means the form-field does receive a string as input.
   * Does not apply to DateTime & Enum (dropdown)
   * @param {Object} fields - props passed from redux
   */
  generateInputFields = fields => {
    const mappedFields = [];
    let key = 0;
    const excludedFields = ["date", "type", "dateAlert"];
    Object.entries(fields).forEach(field => {
      const excludedField = excludedFields.includes(field[1].fieldLabel);
      if (!excludedField) {
        mappedFields.push(<InputField key={++key} props={field[1]} />);
      }
    });
    return mappedFields;
  };

  render() {
    return (
      <Container className="meta_container">
        <Row>
          <Col className="col-12 col-lg-6 meta_col">
            <Form className="meta_form">
              {this.generateInputFields(this.props.fields)}
            </Form>
          </Col>
          <Col className="col-12 col-lg-6 meta_col">
            <Form className="meta_form">
              <DateField />
              <TypeMaterial />
            </Form>
          </Col>
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
