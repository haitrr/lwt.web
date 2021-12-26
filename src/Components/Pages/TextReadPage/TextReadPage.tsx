import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readTextAction } from '../../../Actions/TextAction';
import { setEditingTermAction } from '../../../Actions/TermAction';
import styles from './TextReadPage.module.scss';
import TermEditForm from '../../Forms/TermEditForm';
import ContentPanel from './ContentPanel';
import TextStatistic from './TextStatistic';
import TextTitle from './TextTitle';
import Loading from '../../Loading/Loading';
import { usePrevious } from '../../../Hooks/usePrevious';
import { RootState } from '../../../RootReducer';
import { Term } from '../../../Reducers/TextReducer';
import useLanguages from '../../../Hooks/useLanguages';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

interface Props {
  match: any;
}

/**
 * text read page.
 */
const TextReadPage: React.FC<Props> = () => {
  const { textId } = useParams<{ textId: string }>();
  const { terms, id, language, title, bookmark } = useSelector((state: RootState) => {
    console.log('state');
    if (state.text.readingText) {
      return {
        terms: state.text.readingText.terms,
        language: state.text.readingText.languageCode,
        id: state.text.readingText.id,
        bookmark: state.text.readingText.bookmark,
        title: state.text.readingText.title,
      };
    }
    return { title: '' };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readTextAction(Number.parseInt(textId, 10)));
    return () => {
      dispatch(setEditingTermAction(null));
    };
  }, [textId]);

  const [utt] = React.useState(new SpeechSynthesisUtterance());

  const { languages } = useLanguages();
  const prevProps = usePrevious({ language });
  useEffect(() => {
    return () => {
      const shouldSetLanguage = !prevProps?.language || prevProps.language !== language;
      if (shouldSetLanguage) {
        setSpeechVoice();
      }
    };
  });

  const setSpeechVoice = () => {
    if (language && languages) {
      const languageS = languages.find((l) => l.code === language);
      const voices = window.speechSynthesis.getVoices();
      if (languageS) {
        utt.lang = languageS.speakCode;
        if (languageS.speakCode === 'zh-CN') {
          const googleVoice = voices.find((v) => v.name === 'Google 普通话（中国大陆）');
          if (googleVoice) {
            utt.voice = googleVoice;
          } else {
            utt.voice = voices.find((v) => v.lang === languageS.speakCode) || null;
          }
        } else if (languageS.speakCode === 'en-US') {
          const googleVoice = voices.find((v) => v.name === 'Google US English');
          if (googleVoice) {
            utt.voice = googleVoice;
          } else {
            utt.voice = voices.find((v) => v.lang === languageS.speakCode) || null;
          }
        }
      }
    }
  };

  window.speechSynthesis.onvoiceschanged = setSpeechVoice;
  const onSpeak = (term: Term) => {
    utt.text = term.content;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  };

  console.log('read page');

  if (!id || !languages) {
    return <Loading />;
  }

  return (
    <div className={styles.readPane} id="readPanel">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <TextTitle title={title} />
      <TextStatistic textId={id} />
      <ContentPanel onSpeak={onSpeak} textId={id} />
      {terms && <TermEditForm className={styles.termEditForm} />}
    </div>
  );
};

export default TextReadPage;
