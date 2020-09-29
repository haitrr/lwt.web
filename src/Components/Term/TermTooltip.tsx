import { Popover, Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import styles from "./Term.module.scss";
import TermButton from "./TermButton";
import {
  dictionaryTermMeaningAction,
  editTermActionCreator,
} from "../../Actions/TermAction";
import {
  getNextLearningLevel,
  getPreviousLearningLevel,
  importantColors,
} from "../../Enums";
import { selectDictionaryLanguage } from "../../Selectors/UserSelectors";
import { setBookmarkAction, selectTermAction } from "../../Actions/TextAction";
import normalize from "../../textNormalizer";
import { TextTermState } from "../../Reducers/TextReducer";
import { RootState } from "../../RootReducer";
import { TermEditModel } from "../../Apis/TermApi";

interface TermTooltipProps {
  term: TextTermState;
  meaning: string;
  learningLevel: string;
  editTerm: (term: TermEditModel) => Promise<void>;
  onSpeak: Function;
  setBookmark: Function;
  textId: number;
  dictionaryTerm: Function;
  dictionaryLanguage: string;
  readingLanguageCode: string;
  bookmark: boolean;
  bookmarkRef: any;
  last: any;
  onClick: Function;
  onHover: () => void;
  setSelectingTerm: Function;
}
interface TermTooltipState {
  loading: boolean;
  dictionaried: boolean;
}

class TermTooltip extends React.Component<TermTooltipProps, TermTooltipState> {
  state = { loading: false, dictionaried: false };

  dictionaryTimeout: ReturnType<typeof setTimeout> | null = null;

  hoverTimeout: ReturnType<typeof setTimeout> | null = null;

  renderTitle = () => {
    const { term, meaning } = this.props;
    return (
      <span>
        {term.count ? (
          <div style={{ color: importantColors[Math.min(term.count, 49)] }}>
            {`${term.count} in this text.`}
          </div>
        ) : (
          <div>Loading term count</div>
        )}
        <span>{meaning}</span>
      </span>
    );
  };

  better = (e: any) => {
    e.preventDefault();
    const { term, meaning, editTerm, learningLevel } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getNextLearningLevel(learningLevel),
      meaning,
    };
    editTerm(newTerm);
    this.handleSetBookmark();
  };

  handleSetBookmark = () => {
    const { textId, setBookmark, setSelectingTerm, term } = this.props;
    setBookmark(textId, term.indexFrom);
    setSelectingTerm(term.indexFrom);
  };

  worse = (e: any) => {
    e.preventDefault();
    const { term, meaning, editTerm, learningLevel } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getPreviousLearningLevel(learningLevel),
      meaning,
    };
    editTerm(newTerm);
    this.handleSetBookmark();
  };

  speak = (e: any) => {
    e.preventDefault();
    const { onSpeak, term } = this.props;
    onSpeak(term);
    this.handleSetBookmark();
  };

  renderContent = () => {
    const { meaning } = this.props;
    const { loading } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="primary"
          onClick={this.better}
          disabled={meaning === null || loading}
        >
          Better
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "5px" }}
          onClick={this.worse}
          disabled={meaning === null || loading}
        >
          Worse
        </Button>
      </div>
    );
  };

  handleDictionaryTerm = () => {
    const {
      term,
      dictionaryTerm,
      dictionaryLanguage,
      readingLanguageCode,
      meaning,
    } = this.props;
    const { dictionaried } = this.state;
    if (term && !dictionaried && meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: true, dictionaried: true }, () =>
        dictionaryTerm(
          normalize(term.content, readingLanguageCode),
          readingLanguageCode,
          dictionaryLanguage,
          term.id
        ).then(() => this.setState({ loading: false }))
      );
    }
  };

  handleMouseEnter = () => {
    const { term, meaning } = this.props;
    const { dictionaried } = this.state;
    if (term && !dictionaried && meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      this.dictionaryTimeout = setTimeout(() => {
        this.handleDictionaryTerm();
      }, 100);
    }
    const { onHover } = this.props;
    this.hoverTimeout = setTimeout(onHover, 100);
  };

  handleMouseLeave = () => {
    clearTimeout(this.hoverTimeout as NodeJS.Timeout);
    clearTimeout(this.dictionaryTimeout as NodeJS.Timeout);
  };

  render() {
    const {
      bookmark,
      bookmarkRef,
      last,
      term,
      onClick,
      meaning,
      learningLevel,
    } = this.props;
    return (
      <Popover
        overlayClassName={styles.tooltip}
        title={this.renderTitle()}
        content={this.renderContent()}
        mouseLeaveDelay={0.5}
        mouseEnterDelay={0.3}
        destroyTooltipOnHide
      >
        <span
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <TermButton
            bookmark={bookmark}
            bookmarkRef={bookmarkRef}
            last={last}
            meanign={meaning}
            learningLevel={learningLevel}
            term={term}
            onClick={onClick}
          />
        </span>
      </Popover>
    );
  }
}

export default connect(
  (state: RootState) => {
    if (!state.text.readingText) throw new Error();
    return {
      dictionaryLanguage: selectDictionaryLanguage(state),
      readingLanguageCode: state.text.readingText.languageCode,
      textId: state.text.readingText.id,
    };
  },
  {
    editTerm: editTermActionCreator,
    dictionaryTerm: dictionaryTermMeaningAction,
    setBookmark: setBookmarkAction,
    setSelectingTerm: selectTermAction,
  }
)(TermTooltip);
