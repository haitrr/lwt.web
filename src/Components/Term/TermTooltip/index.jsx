import PropTypes from "prop-types";
import {Popper} from "@material-ui/core";
import React, {useState} from "react";
import {connect} from "react-redux";
import {
  dictionaryTermMeaningAction,
  editTermAction,
} from "../../../Actions/TermAction";
import {getNextLearningLevel, getPreviousLearningLevel} from "../../../Enums";
import {selectDictionaryLanguage} from "../../../Selectors/UserSelectors";
import {
  selectTermAction,
  setBookmarkAction,
} from "../../../Actions/TextAction";
import normalize from "../../../textNormalizer";
import TermAnchor from "./TermAnchor";
import PopoverBody from "./PopoverBody";

const TermTooltip = (
  {
    term,
    bookmark,
    onSpeak,
    onClick,
    onHover,
    dictionaryLanguage,
    readingLanguageCode,
    textId,
    dictionaryTerm,
    index,
    setBookmark,
    setSelectingTerm,
    editTerm
  }) => {
  const [loading, setLoading] = useState(false);
  const [dictionaried, setDictionaried] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const better = () => {
    const newTerm = {
      ...term,
      learningLevel: getNextLearningLevel(term.learningLevel),
    };
    editTerm(newTerm);
    handleSetBookmark();
  };

  const handleSetBookmark = () => {
    setBookmark(textId, index);
    setSelectingTerm(index);
  };

  const worse = () => {
    const newTerm = {
      ...term,
      learningLevel: getPreviousLearningLevel(term.learningLevel),
    };
    editTerm(newTerm);
    handleSetBookmark();
  };

  const speak = (e) => {
    e.preventDefault();
    onSpeak(term);
    handleSetBookmark();
  };

  const handleDictionaryTerm = () => {
    if (term && !dictionaried && term.meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      setLoading(true)
      setDictionaried(true)
      dictionaryTerm(
        normalize(term.content, readingLanguageCode),
        readingLanguageCode,
        dictionaryLanguage,
        index
      ).then(() => setLoading(false))
    }
  };

  const handleMouseEnter = (event) => {
    clearTimeout(this.hideTimout);
    clearTimeout(this.leavePopoverTimout);
    setAnchorEl(event.currentTarget)
    const {term} = this.props;
    const {dictionaried} = this.state;
    if (term && !dictionaried && term.meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      this.dictionaryTimeout = setTimeout(() => {
        handleDictionaryTerm();
      }, 100);
    }
    this.hoverTimeout = setTimeout(onHover, 100);
  };

  const handleMouseLeave = () => {
    this.hideTimout = setTimeout(() => {
      setAnchorEl(null)
    }, 100);
    clearTimeout(this.hoverTimeout);
    clearTimeout(this.dictionaryTimeout);
  };

  const handlePopoverClose = () => {
    this.leavePopoverTimout = setTimeout(
      () => setAnchorEl(null),
      100
    );
  };

  const handleMouseEnterPopper = () => {
    clearTimeout(this.hideTimout);
    clearTimeout(this.leavePopoverTimout);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <TermAnchor
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        bookmark={bookmark}
        term={term}
        onClick={onClick}
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        style={{whiteSpace: "pre-line"}}
        placement="top"
        onClose={handlePopoverClose}
      >
        <PopoverBody
          onMouseEnter={handleMouseEnterPopper}
          onMouseLeave={handleMouseLeave}
          term={term}
          loading={loading}
          better={better}
          worse={worse}
        />
      </Popper>
    </>
  );
}

TermTooltip.defaultProps = {
  bookmark: false,
};

TermTooltip.propTypes = {
  term: PropTypes.shape({
    learningLevel: PropTypes.string.isRequired,
    meaning: PropTypes.string,
  }).isRequired,
  bookmark: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  editTerm: PropTypes.func.isRequired,
  dictionaryTerm: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  readingLanguageCode: PropTypes.string.isRequired,
  dictionaryLanguage: PropTypes.string.isRequired,
  setBookmark: PropTypes.func.isRequired,
  textId: PropTypes.number.isRequired,
  setSelectingTerm: PropTypes.func.isRequired,
  onSpeak: PropTypes.func.isRequired,
};
export default connect(
  (state) => ({
    dictionaryLanguage: selectDictionaryLanguage(state),
    readingLanguageCode: state.text.readingText.languageCode,
    textId: state.text.readingText.id,
  }),
  {
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction,
    setBookmark: setBookmarkAction,
    setSelectingTerm: selectTermAction,
  }
)(TermTooltip);
