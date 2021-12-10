import React from "react";
import {connect} from "react-redux";
import {Button, TextField} from "@material-ui/core";
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
import {selectEditingTermValue} from "../../../Selectors/TermSelectors";
import {selectDictionaryLanguage} from "../../../Selectors/UserSelectors";
import {getNextLearningLevel, TermLearningLevel} from "../../../Enums";
import {usePrevious} from "../../../Hooks/usePrevious";
import {Language, RootState} from "../../../RootReducer";
import {Formik, Form, Field, FormikProps, FieldProps} from "formik";
import {Term} from "../../../Reducers/TextReducer";

interface Props {
  value: Term;
  dictionaryLanguage: string
  languages: Language[]
  languageCode: string
  dictionaryTerm: Function
  editingTerm: number | null
  editTerm: Function
  createTerm: Function
  setEditingTerm: Function
  index: number | null;
  className: string
}

interface FormValues {
  content: string;
  meaning: string;
  learningLevel: string;
}

const TermEditForm: React.FC<Props> = (
  {
    value,
    dictionaryLanguage,
    languages,
    languageCode,
    dictionaryTerm,
    editingTerm,
    editTerm,
    createTerm,
    setEditingTerm,
    className,
    index,
  }) => {
  const formRef = React.createRef<FormikProps<FormValues>>();

  const [dictionary, setDictionary] = React.useState({lookingUpDictionary: false, lookedUpDictionary: false})

  const prevProps = usePrevious({index, value})

  React.useEffect(() => {
    if (index !== prevProps?.index) {
      // eslint-disable-next-line react/no-did-update-set-state
      setDictionary({...dictionary, lookedUpDictionary: false})
    }

    if (
      // meaning is loaded but empty
      value.content &&
      // unknown term
      value.meaning === "" &&
      !dictionary.lookedUpDictionary
    ) {
      const {code} = languages.find((l) => l.code === languageCode)!;
      // eslint-disable-next-line react/no-did-update-set-state
      setDictionary({lookedUpDictionary: true, lookingUpDictionary: true})
      dictionaryTerm(
        normalize(value.content, code),
        languageCode,
        dictionaryLanguage,
        index
      ).finally(() => setDictionary({...dictionary, lookingUpDictionary: false}))
    }
    if (value.index !== prevProps?.value.index) {
      if (formRef.current) {
        formRef.current?.setValues({...value});
      }
    } else if (value.meaning !== prevProps?.value.meaning) {
      if (formRef.current) {
        formRef.current.setValues({...formRef.current.values, meaning: value.meaning});
      }
    }
  }, [index, value?.content, value?.meaning]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (values: any) => {
    const editedTerm = {...value, ...values};
    if (!value.id) {
      createTerm(editedTerm);
    } else {
      editTerm(editedTerm);
    }
    setEditingTerm(null);
  };

  const handleBetter = (e: any) => {
    const value = formRef.current!.values;
    e.preventDefault();
    const newValue = {
      ...value,
      learningLevel: getNextLearningLevel(value.learningLevel),
    };
    formRef.current?.setValues(newValue);
    handleSubmit(newValue);
  };

  const isActionDisabled = () => {
    return (
      dictionary.lookingUpDictionary ||
      (value.learningLevel !== TermLearningLevel.UnKnow &&
        value.meaning === null)
    );
  };

  if (editingTerm == null || !value) {
    return null;
  }

  return (
    <Formik initialValues={value} onSubmit={handleSubmit} innerRef={formRef}>
      {({values, handleChange, setFieldValue, handleBlur}) => {
        return <Form>
          <div className={`${className} ${styles.form}`}>
            <TermContent term={value}/>
            <Field
              className={styles.content}
              label="Content"
              name="content"
              component={TextField}
              value={values.content}
            >
            </Field>
            <Field
              className={styles.language}
              name="languageCode"
              value={languageCode}
              component={LanguageSelect}
              disabled
            >
            </Field>

            <Field
              name="meaning"
              value={values.meaning}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.meaning}
            >
              {({field}: FieldProps<FormValues>) => {
                return <TextField
                  key="meaning"
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                  label="Meaning"
                  value={field.value}
                  disabled={isActionDisabled()}
                  onChange={field.onChange}
                  name={field.name}
                  onBlur={field.onBlur}
                  fullWidth
                  rows={2}
                  rowsMax={4}
                  multiline
                />
              }
              }
            </Field>
            <Field
              name="learningLevel"
              initialValue={value.learningLevel}
              onBlur={handleBlur}
              value={values.learningLevel}
              className={styles.learningLevel}
              onChange={(value: string) => {
                setFieldValue("learningLevel", value)
              }
              }
              component={LearningLevelSelect}
            />
            <div className={styles.buttons}>
              <div className={styles.saveButton}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleBetter}
                  disabled={isActionDisabled()}
                  className={styles.saveButton}
                >
                  Better
                </Button>
              </div>
              <div className={styles.saveButton}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isActionDisabled()}
                  className={styles.saveButton}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>

        </Form>
      }}
    </Formik>
  )
}
export default connect(
  (state: RootState) => {
    if (!state.text.readingText) {
      throw new Error("not reading text")
    }
    return ({
      value: {...selectEditingTermValue(state)},
      dictionaryLanguage: selectDictionaryLanguage(state),
      editingTerm: state.term.editingTerm,
      languageCode: state.text.readingText.languageCode,
      languages: state.language.languages,
      index: state.term.editingTerm,
    })
  },
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction,
  }
)(TermEditForm);
