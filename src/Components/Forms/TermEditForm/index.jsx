import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import compromise from "compromise";
import LearningLevelSelect from "../../Inputs/LearningLevelSelect";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TermEditForm.module.scss";
import {
  createTermAction,
  editTermAction,
  dictionaryTermMeaningAction,
  setEditingTermAction
} from "../../../Actions/TermAction";
import { selectEditingTermValue } from "../../../Selectors/TermSelectors";
import { selectDictionaryLanguage } from "../../../Selectors/UserSelectors";
import { TermLearningLevel, getNextLearningLevel } from "../../../Enums";
import { importantColors } from "../../Term/TermTooltip";

class TermEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lookingUpDictionary: false };
  }

  componentDidUpdate(prevProps) {
    const {
      value,
      dictionaryLanguage,
      languages,
      languageCode,
      dictionaryTerm,
      index
    } = this.props;

    const { content: prevContent, meaning: prevMeaning } = prevProps.value;

    if (
      // meaning is loaded but empty
      (value.content &&
        // unknown term
        value.meaning === "" &&
        (!prevProps.value || prevContent !== value.content)) ||
      // meaning is not loaded then loaded but empty
      (prevMeaning === undefined && value.meaning === "")
    ) {
      const { code } = languages.find(l => l.code === languageCode);
      if (code === "en") {
        let simplified = value.content;
        const doc = compromise(simplified);
        doc.nouns().toSingular();
        doc.unTag("#Noun");
        doc.tag("#Verb");
        simplified = doc
          .verbs()
          .toInfinitive()
          .out();
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ lookingUpDictionary: true }, () =>
          dictionaryTerm(
            simplified,
            languageCode,
            dictionaryLanguage,
            index
          ).then(() => this.setState({ lookingUpDictionary: false }))
        );
        return;
      }

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ lookingUpDictionary: true }, () =>
        dictionaryTerm(
          value.content,
          languageCode,
          dictionaryLanguage,
          index
        ).then(() => this.setState({ lookingUpDictionary: false }))
      );
    }
  }

  handleSubmit = e => {
    const {
      form: { getFieldsValue },
      value,
      createTerm,
      editTerm,
      setEditingTerm
    } = this.props;
    e.preventDefault();
    const editedData = getFieldsValue();
    const editedTerm = { ...value, ...editedData };
    if (!value.id) {
      createTerm(editedTerm);
    } else {
      editTerm(editedTerm);
    }
    setEditingTerm(null);
  };

  handleBetter = e => {
    const {
      form: { setFieldsValue },
      value
    } = this.props;
    e.preventDefault();
    setFieldsValue({
      ...value,
      learningLevel: getNextLearningLevel(value.learningLevel)
    });
    this.handleSubmit(e);
  };

  render() {
    const {
      form: { getFieldDecorator },
      value,
      languageCode,
      className,
      editingTerm
    } = this.props;
    if (!editingTerm) {
      return null;
    }

    const { lookingUpDictionary } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="inline"
        className={`${className} ${styles.form}`}
      >
        <CopyToClipboard
          text={value.content}
          onCopy={() => notification.info({ message: "Copied to clipboard." })}
        >
          <div
            className={styles.title}
            style={{ color: importantColors[Math.min(value.count, 49)] }}
          >
            {`${value.content}(${value.count ?? "-"})`}
          </div>
        </CopyToClipboard>
        <Form.Item className={styles.content} label="Content">
          {getFieldDecorator("content", { initialValue: value.content })(
            <React.Fragment>
              <Input disabled />
            </React.Fragment>
          )}
        </Form.Item>
        <Form.Item className={styles.language}>
          {getFieldDecorator("languageCode", { initialValue: languageCode })(
            <LanguageSelect disabled />
          )}
        </Form.Item>

        <Row>
          <Col xl={10} lg={12} xs={24}>
            <Form.Item className={styles.meaning}>
              {getFieldDecorator("meaning", {
                initialValue: value.meaning
              })(
                <Input.TextArea
                  disabled={
                    lookingUpDictionary ||
                    (value.learningLevel !== TermLearningLevel.UnKnow &&
                      value.meaning === undefined)
                  }
                  autosize={{ maxRows: 3, minRows: 2 }}
                  placeholder="Meaning"
                  cols={60}
                />
              )}
            </Form.Item>
          </Col>
          <Col xl={10} lg={12} xs={24}>
            <Form.Item className={styles.learningLevel}>
              {getFieldDecorator("learningLevel", {
                initialValue: value.learningLevel
              })(<LearningLevelSelect />)}
            </Form.Item>
          </Col>
          <Col xl={4} lg={24} xs={24}>
            <Row gutter={1}>
              <Col xs={12} lg={24}>
                <Form.Item className={styles.saveButton}>
                  <Button
                    type="primary"
                    onClick={this.handleBetter}
                    disabled={
                      lookingUpDictionary ||
                      (value.learningLevel !== TermLearningLevel.UnKnow &&
                        value.meaning === undefined)
                    }
                    className={styles.saveButton}
                  >
                    Better
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={12} lg={24} l>
                <Form.Item className={styles.saveButton}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      lookingUpDictionary ||
                      (value.learningLevel !== TermLearningLevel.UnKnow &&
                        value.meaning === undefined)
                    }
                    className={styles.saveButton}
                  >
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}

TermEditForm.defaultProps = {
  className: "",
  editingTerm: "",
  value: null,
  dictionaryLanguage: null,
  index: null
};

TermEditForm.propTypes = {
  className: PropTypes.string,
  createTerm: PropTypes.func.isRequired,
  dictionaryLanguage: PropTypes.string,
  editTerm: PropTypes.func.isRequired,
  editingTerm: PropTypes.number,
  form: PropTypes.shape({}).isRequired,
  languageCode: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setEditingTerm: PropTypes.func.isRequired,
  value: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string
  }),
  dictionaryTerm: PropTypes.func.isRequired,
  index: PropTypes.number
};
export default connect(
  state => ({
    value: { ...selectEditingTermValue(state) },
    dictionaryLanguage: selectDictionaryLanguage(state),
    editingTerm: state.term.editingTerm,
    languageCode: state.text.readingText.languageCode,
    languages: state.language.languages,
    index: state.term.editingTerm
  }),
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction
  }
)(Form.create()(TermEditForm));
