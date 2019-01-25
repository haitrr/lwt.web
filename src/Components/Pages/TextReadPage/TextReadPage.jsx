import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import { readTextAction } from "../../../Actions/TextAction";
import styles from "./TextReadPage.module.scss";
import TermEditForm from "../../Forms/TermEditForm";
import {
  getTermAction,
  setEditingTermAction
} from "../../../Actions/TermAction";
import Term from "../../Term";

/**
 * text read page.
 */
class TextReadPage extends React.Component {
  componentDidMount() {
    const {
      readText,
      match: {
        params: { textId }
      }
    } = this.props;
    readText(textId);
  }

  render() {
    const { readingText, editingTerm } = this.props;
    return readingText ? (
      <Row>
        <Col md={12}>
          <div>{readingText.title}</div>
          <div className={styles.textReadContainer}>
            {readingText.terms.map((term, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Term key={index} term={term} index={index} />
            ))}
          </div>
        </Col>
        <Col md={12}>{editingTerm ? <TermEditForm /> : <div />}</Col>
      </Row>
    ) : null;
  }
}

export default connect(
  state => ({
    readingText: state.text.readingText,
    editingTerm: state.term.editingTerm
  }),
  {
    readText: readTextAction,
    getTerm: getTermAction,
    setEditingTerm: setEditingTermAction
  }
)(TextReadPage);

TextReadPage.propTypes = {
  editingTerm: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  readText: PropTypes.func.isRequired,
  readingText: PropTypes.shape().isRequired
};
