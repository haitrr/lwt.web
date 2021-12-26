import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TextReadPage.module.scss';
import Term from '../../Term';
import ProgressBar from './ProgressBar';
import GoToBookmarkButton from './GoToBookmarkButton';
import { getTextTermsAction, setTermIndexBeginAction, setTermIndexEndAction } from '../../../Actions/TextAction';
import { setEditingTermAction } from '../../../Actions/TermAction';
import Loading from '../../Loading/Loading';
import { LAST_BEGIN_INDEX_ID } from '../../Term/TermButton';
import TermObserver from '../../Term/TermObserver';
import { usePrevious } from '../../../Hooks/usePrevious';
import { Term as TermItem } from '../../../Reducers/TextReducer';
import { RootState } from '../../../RootReducer';
import useDidMountEffect from '../../../Hooks/useDidMountEffect';

const TermCountPerProgressPoint = 50;

let displayTerms;
let renderingLast: any;
let loadTerms: any;

interface Props {
  textId: number;
  onSpeak: (t: TermItem) => void;
}

const ContentPanel: React.FC<Props> = ({ textId, onSpeak }) => {
  const dispatch = useDispatch();
  const { terms, begin, editingTerm, end, termCount } = useSelector((state: RootState) => {
    if (!state.text.readingText) {
      throw new Error('not reading text');
    }
    return {
      terms: state.text.readingText.terms,
      begin: state.text.readingText.termIndexBegin,
      end: state.text.readingText.termIndexEnd,
      termCount: state.text.readingText.termCount,
      editingTerm: state.term.editingTerm,
    };
  });
  React.useEffect(() => {
    if (window.innerWidth > 700) {
      // desktop
      displayTerms = 1000;
      loadTerms = 300;
    } else {
      // mobile
      displayTerms = 750;
      loadTerms = 150;
    }
    dispatch(setTermIndexBeginAction(Math.max(begin - Math.floor(displayTerms / 2), 0)));
    dispatch(setTermIndexEndAction(Math.min(end + displayTerms, termCount - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const container = React.createRef<HTMLDivElement>();
  const [loading, setLoading] = React.useState(true);

  const prevProps = usePrevious({ begin, terms, end });
  useDidMountEffect(() => {
    if (prevProps?.begin !== undefined && begin < prevProps?.begin) {
      dispatch(getTextTermsAction(textId, begin, prevProps?.begin));
    }

    if (prevProps?.terms[begin] !== terms[begin]) {
      scrollToLast();
    }
  }, [begin, prevProps, terms, textId]);

  useDidMountEffect(() => {
    if (prevProps?.end !== undefined) {
      if (end > prevProps.end) {
        dispatch(getTextTermsAction(textId, prevProps.end, end));
      }
    }
  }, [end, textId, prevProps]);

  React.useEffect(() => {
    // scroll to the bookmark ofter initial loading
    if (terms[begin] && terms[end] && loading) {
      setLoading(false);
      const bookmarkEl = document.getElementById('bookmark');
      if (bookmarkEl) {
        bookmarkEl.scrollIntoView({ block: 'center' });
      }
    }
  }, [terms, begin, end, loading]);

  const scrollToLast = () => {
    const lastBeginEl = document.getElementById(LAST_BEGIN_INDEX_ID);
    if (lastBeginEl) {
      lastBeginEl.scrollIntoView();
      renderingLast = false;
    } else {
      renderingLast = true;
    }
  };

  const goToBookmark = () => {
    const bookmarkEl = document.getElementById('bookmark');
    if (bookmarkEl) {
      bookmarkEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  const handleScroll = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.id !== 'contentPanel') {
      return;
    }
    if (editingTerm) {
      dispatch(setEditingTermAction(null));
    }
    // loading
    if (!terms[begin] || !terms[end]) {
      return;
    }

    if (renderingLast) {
      scrollToLast();
      return;
    }

    const top = e.target.scrollTop < 100;
    if (top) {
      if (begin > 0) {
        dispatch(setTermIndexBeginAction(Math.max(begin - loadTerms, 0)));
        return;
      }
    }
    const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 100;
    if (bottom) {
      if (end < termCount - 1) {
        dispatch(setTermIndexEndAction(Math.min(end + loadTerms, termCount - 1)));
      }
    }
  };

  // initial loading
  if ((!terms[begin] || !terms[end]) && loading) {
    return (
      <div style={{ height: '50%' }}>
        <Loading />
      </div>
    );
  }
  const termElements = [];
  for (let i = begin; i <= end; i += 1) {
    if (terms[i]) {
      if (i % TermCountPerProgressPoint === 0) {
        termElements.push(
          <TermObserver index={i}>
            <Term
              onSpeak={onSpeak}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              index={i}
            />
          </TermObserver>,
        );
      } else {
        termElements.push(
          <Term
            onSpeak={onSpeak}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            index={i}
          />,
        );
      }
    }
  }

  return (
    <>
      <div onScroll={handleScroll} id="contentPanel" className={styles.contentPanel} ref={container}>
        {/* end loading */}
        {!terms[begin] && <Loading className={styles.loading} />}
        {termElements}
        {/* begin loading */}
        {!terms[end] && <Loading className={styles.loading} />}
        <ProgressBar />
      </div>
      {!editingTerm && <GoToBookmarkButton onClick={goToBookmark} />}
    </>
  );
};

export default ContentPanel;
