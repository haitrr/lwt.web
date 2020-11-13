import PropTypes from "prop-types";
import { Box, Paper, Popper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import TermButton from "../TermButton";
import {
  dictionaryTermMeaningAction,
  editTermAction,
} from "../../../Actions/TermAction";
import { getNextLearningLevel, getPreviousLearningLevel } from "../../../Enums";
import { selectDictionaryLanguage } from "../../../Selectors/UserSelectors";
import {
  setBookmarkAction,
  selectTermAction,
} from "../../../Actions/TextAction";
import normalize from "../../../textNormalizer";
import Title from "./Title";
import Content from "./Content";

class TermTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, dictionaried: false, alchorEl: null };
  }

  better = () => {
    const { term, editTerm } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getNextLearningLevel(term.learningLevel),
    };
    editTerm(newTerm);
    this.handleSetBookmark();
  };

  handleSetBookmark = () => {
    const { textId, index, setBookmark, setSelectingTerm } = this.props;
    setBookmark(textId, index);
    setSelectingTerm(index);
  };

  worse = () => {
    const { term, editTerm } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getPreviousLearningLevel(term.learningLevel),
    };
    editTerm(newTerm);
    this.handleSetBookmark();
  };

  speak = (e) => {
    e.preventDefault();
    const { onSpeak, term } = this.props;
    onSpeak(term);
    this.handleSetBookmark();
  };

  handleDictionaryTerm = () => {
    const {
      term,
      index,
      dictionaryTerm,
      dictionaryLanguage,
      readingLanguageCode,
    } = this.props;
    const { dictionaried } = this.state;
    if (term && !dictionaried && term.meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: true, dictionaried: true }, () =>
        dictionaryTerm(
          normalize(term.content, readingLanguageCode),
          readingLanguageCode,
          dictionaryLanguage,
          index
        ).then(() => this.setState({ loading: false }))
      );
    }
  };

  handleMouseEnter = (event) => {
    this.setState({ alchorEl: event.currentTarget });
    const { term } = this.props;
    const { dictionaried } = this.state;
    if (term && !dictionaried && term.meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      this.dictionaryTimeout = setTimeout(() => {
        this.handleDictionaryTerm();
      }, 100);
    }
    const { onHover } = this.props;
    this.hoverTimeout = setTimeout(onHover, 100);
  };

  handleMouseLeave = () => {
    this.hideTimout = setTimeout(() => {
      this.setState({ alchorEl: null });
    }, 100);
    clearTimeout(this.hoverTimeout);
    clearTimeout(this.dictionaryTimeout);
  };

  handlePopoverClose = () => {
    this.setState({ alchorEl: null });
  };

  render() {
    const { bookmark, bookmarkRef, last, term, onClick } = this.props;
    const open = Boolean(this.state.alchorEl);
    return (
      <>
        <span
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <TermButton
            bookmark={bookmark}
            bookmarkRef={bookmarkRef}
            last={last}
            term={term}
            onClick={onClick}
          />
        </span>
        <Popper
          open={open}
          anchorEl={this.state.alchorEl}
          style={{ whiteSpace: "pre-line" }}
          placement="top"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          onClose={this.handlePopoverClose}
        >
          <Box
            p={2}
            onMouseEnter={() => {
              clearTimeout(this.hideTimout);
            }}
            onMouseLeave={this.handleMouseLeave}
            style={{ maxWidth: "30vw" }}
          >
            <Paper style={{ padding: "1rem" }}>
              <Title term={term} />
              <Content
                term={term}
                loading={this.state.loading}
                better={this.better}
                worse={this.worse}
              />
            </Paper>
          </Box>
        </Popper>
      </>
    );
  }
}

TermTooltip.defaultProps = {
  bookmark: false,
  last: null,
};

TermTooltip.propTypes = {
  term: PropTypes.shape({
    learningLevel: PropTypes.string.isRequired,
    meaning: PropTypes.string,
  }).isRequired,
  bookmark: PropTypes.bool,
  bookmarkRef: PropTypes.shape({}).isRequired,
  last: PropTypes.shape({}),
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
