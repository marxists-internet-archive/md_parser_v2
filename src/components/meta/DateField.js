import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { updateDate, updateMeta } from "../../store/actions/metaActions";
import moment from "moment";
import "moment/locale/ru";

const DateField = props => {
  const { fieldLabel, fieldName, fieldValue, isRequired } = props.date;
  const { dateResult } = props.dateResult;

  const onChange = e => {
    props.updateMeta({
      fieldLabel,
      fieldName,
      fieldValue: e.target.value,
      isRequired
    });

    props.updateDate({
      dateResult: transformDate(e.target.value)
    });
  };

  const transformDate = dateString => {
    moment.locale("ru");
    const ruMoment = moment(dateString);

    let result = "";
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      result = ruMoment.format("LL");
    } else if (dateString.match(/^\d{4}-\d{2}$/)) {
      result = ruMoment.format("MMMM YYYY");
    } else if (dateString.match(/^\d{4}$/)) {
      result = ruMoment.format("YYYY") + "-й";
    } else {
      result =
        '<p style="color:red; font-size:14px; margin-top: 5px;">Пожалуйста введите правильный формат числа!<br> Например 1917 или 1917-11 или 1917-11-07</p>';
    }
    return result;
  };

  return (
    <Form.Group>
      <Form.Label>{fieldName}</Form.Label>
      <Form.Control
        required={isRequired}
        id={fieldLabel}
        value={fieldValue}
        onChange={onChange}
      />
      <div dangerouslySetInnerHTML={{ __html: dateResult }} />
      <h1 />
    </Form.Group>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateDate: state => {
      dispatch(updateDate(state));
    },
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
