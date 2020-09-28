import React from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Input, Row } from "antd";
import { FormInstance } from "antd/lib/form";
import TermContent from "./TermContent";
import LearningLevelSelect from "../../Inputs/LearningLevelSelect";
import normalize from "../../../textNormalizer";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TermEditForm.module.scss";
import {
  createTermAction,
  dictionaryTermMeaningAction,
  editTermAction,
  setEditingTermAction,
} from "../../../Actions/TermAction";
import { selectDictionaryLanguage } from "../../../Selectors/UserSelectors";
import { getNextLearningLevel, TermLearningLevel } from "../../../Enums";
import { TermInfoState, TextTermState } from "../../../Reducers/TextReducer";
import { RootState } from "../../../RootReducer";

interface TermEditFormProps {
  value: TermInfoState;
  textTerm: TextTermState;
  dictionaryLanguage: string;
  languages: any[];
  languageCode: string;
  dictionaryTerm: any;
  createTerm: Function;
  editTerm: Function;
  setEditingTerm: Function;
  className: string;
  editingTerm: TextTermState;
}

interface TermEditFormState {
  lookedUpDictionary: boolean;
  lookingUpDictionary: boolean;
}

class TermEditForm extends React.Component<
  TermEditFormProps,
  TermEditFormState
> {
  formRef = React.createRef<FormInstance>();

  constructor(props: TermEditFormProps) {
    super(props);
    this.state = { lookingUpDictionary: false, lookedUpDictionary: false };
  }

  componentDidUpdate(
    prevProps: Readonly<TermEditFormProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {
    const {
      value,
      dictionaryLanguage,
      languages,
      languageCode,
      dictionaryTerm,
      textTerm,
    } = this.props;
    if (!value) return;

    const { lookedUpDictionary } = this.state;
    if (textTerm !== prevProps.textTerm) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ lookedUpDictionary: false });
    }

    if (
      // meaning is loaded but empty
      textTerm.content &&
      // unknown term
      value.meaning === "" &&
      !lookedUpDictionary
    ) {
      const { code } = languages.find((l) => l.code === languageCode);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        { lookingUpDictionary: true, lookedUpDictionary: true },
        () =>
          dictionaryTerm(
            normalize(textTerm.content, code),
            languageCode,
            dictionaryLanguage,
            textTerm.id
          ).finally(() => this.setState({ lookingUpDictionary: false }))
      );
    }
    if (textTerm.id !== prevProps.textTerm?.id) {
      if (this.formRef.current) {
        this.formRef.current.setFieldsValue({ ...value });
      }
    } else if (value.meaning !== prevProps.value.meaning) {
      if (this.formRef.current) {
        this.formRef.current.setFieldsValue({ meaning: value.meaning });
      }
    }
  }

  handleSubmit = (values: any) => {
    const {
      value,
      createTerm,
      editTerm,
      setEditingTerm,
      textTerm,
    } = this.props;
    const editedTerm = { ...value, ...values };
    if (!textTerm.id) {
      createTerm(editedTerm);
    } else {
      editTerm(editedTerm);
    }
    setEditingTerm(null);
  };

  handleBetter = (e: any) => {
    const { value } = this.props;
    e.preventDefault();
    const newValue = {
      ...value,
      learningLevel: getNextLearningLevel(value.learningLevel),
    };
    if (!this.formRef.current) throw new Error();
    this.formRef.current.setFieldsValue(newValue);
    this.handleSubmit(newValue);
  };

  isActionDisabled = () => {
    const { lookingUpDictionary } = this.state;
    const { value } = this.props;
    return (
      lookingUpDictionary ||
      (value.learningLevel !== TermLearningLevel.UnKnow &&
        value.meaning === null)
    );
  };

  render() {
    const { value, className, editingTerm, languageCode } = this.props;
    if (!editingTerm || !value) {
      return null;
    }

    return (
      <Form onFinish={this.handleSubmit} layout="inline" ref={this.formRef}>
        <div className={`${className} ${styles.form}`}>
          <TermContent term={editingTerm} />
          <Form.Item
            className={styles.content}
            label="Content"
            name="content"
            initialValue={editingTerm.content}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            className={styles.language}
            name="languageCode"
            initialValue={languageCode}
          >
            <LanguageSelect disabled />
          </Form.Item>

          <Row>
            <Col xl={10} lg={12} xs={24}>
              <Form.Item
                name="meaning"
                initialValue={value.meaning}
                className={styles.meaning}
              >
                <Input.TextArea
                  disabled={this.isActionDisabled()}
                  autoSize={{ maxRows: 4, minRows: 2 }}
                  placeholder="Meaning"
                  cols={60}
                />
              </Form.Item>
            </Col>
            <Col xl={10} lg={12} xs={24}>
              <Form.Item
                name="learningLevel"
                initialValue={value.learningLevel}
                className={styles.learningLevel}
              >
                <LearningLevelSelect />
              </Form.Item>
            </Col>
            <Col xl={4} lg={24} xs={24}>
              <Row gutter={1}>
                <Col xs={12} lg={24}>
                  <Form.Item className={styles.saveButton}>
                    <Button
                      type="primary"
                      onClick={this.handleBetter}
                      disabled={this.isActionDisabled()}
                      className={styles.saveButton}
                    >
                      Better
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={12} lg={24}>
                  <Form.Item className={styles.saveButton}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={this.isActionDisabled()}
                      className={styles.saveButton}
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default connect(
  (state: RootState) => {
    if (!state.text.readingText) throw new Error();
    const { termValues } = state.text.readingText;
    return {
      value: termValues[state.term.editingTerm?.id],
      dictionaryLanguage: selectDictionaryLanguage(state),
      editingTerm: state.term.editingTerm,
      languageCode: state.text.readingText.languageCode,
      languages: state.language.languages,
      textTerm: state.term.editingTerm,
    };
  },
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction,
  }
)(TermEditForm);
