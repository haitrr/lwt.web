import { Popper } from '@mui/material';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { dictionaryTermMeaningAction, editTermAction } from '../../../Actions/TermAction';
import { getNextLearningLevel, getPreviousLearningLevel } from '../../../Enums';
import { selectTermAction, setBookmarkAction } from '../../../Actions/TextAction';
import normalize from '../../../textNormalizer';
import TermAnchor from './TermAnchor';
import PopoverBody from './PopoverBody';
import { RootState } from '../../../RootReducer';
import useUserSettings from '../../../Hooks/useUserSettings';
import { useQueryClient } from 'react-query';

interface Props {
  term: any;
  bookmark: any;
  onClick: any;
  onHover: () => void;
  index: number;
}

const TermTooltip: React.FC<Props> = ({ term, bookmark, onClick, onHover, index }) => {
  const [loading, setLoading] = useState(false);
  const [dictionaried, setDictionaried] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { readingLanguageCode, textId } = useSelector((state: RootState) => {
    if (!state.text.readingText) {
      throw new Error('not reading text');
    }
    return {
      readingLanguageCode: state.text.readingText.languageCode,
      textId: state.text.readingText.id,
    };
  }, shallowEqual);

  const queryClient = useQueryClient();

  const better = () => {
    const newTerm = {
      ...term,
      learningLevel: getNextLearningLevel(term.learningLevel),
    };
    dispatch(editTermAction(newTerm));
    handleSetBookmark();
    queryClient.fetchQuery({ queryKey: `textTermsCountByLL:${textId}` });
  };

  const handleSetBookmark = () => {
    dispatch(setBookmarkAction(textId, index));
    dispatch(selectTermAction(index));
  };

  const worse = () => {
    const newTerm = {
      ...term,
      learningLevel: getPreviousLearningLevel(term.learningLevel),
    };
    dispatch(editTermAction(newTerm));
    handleSetBookmark();
    queryClient.fetchQuery({ queryKey: `textTermsCountByLL:${textId}` });
  };

  const { userSettings } = useUserSettings();
  const dictionaryLanguage = userSettings?.languageSettings?.find(
    (l) => l.languageCode === readingLanguageCode,
  )!.dictionaryLanguageCode;

  const handleDictionaryTerm = () => {
    if (term && !dictionaried && term.meaning === '') {
      // eslint-disable-next-line react/no-did-update-set-state
      setLoading(true);
      setDictionaried(true);
      dispatch(
        dictionaryTermMeaningAction(
          normalize(term.content, readingLanguageCode),
          readingLanguageCode,
          dictionaryLanguage!,
          index,
        ),
      );
      setLoading(false);
    }
  };

  const hideTimout = React.useRef<any>(undefined);
  const leavePopoverTimout = React.useRef<any>(undefined);
  const dictionaryTimeout = React.useRef<any>(undefined);
  const hoverTimeout = React.useRef<any>(undefined);

  const handleMouseEnter = (event: any) => {
    clearTimeout(hideTimout.current);
    clearTimeout(leavePopoverTimout.current);
    setAnchorEl(event.currentTarget);
    if (term && !dictionaried && term.meaning === '') {
      // eslint-disable-next-line react/no-did-update-set-state
      dictionaryTimeout.current = setTimeout(() => {
        handleDictionaryTerm();
      }, 100);
    }
    hoverTimeout.current = setTimeout(onHover, 100);
  };

  const handleMouseLeave = () => {
    hideTimout.current = setTimeout(() => {
      setAnchorEl(null);
    }, 100);
    clearTimeout(hoverTimeout.current);
    clearTimeout(dictionaryTimeout.current);
  };

  const handleMouseEnterPopper = () => {
    clearTimeout(hideTimout.current);
    clearTimeout(leavePopoverTimout.current);
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
      <Popper open={open} anchorEl={anchorEl} style={{ whiteSpace: 'pre-line' }} placement="top">
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
};

export default TermTooltip;
