import React, { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import { setViewingTermAction } from '../../Actions/TextAction';

interface OwnProps {
  index: number;
}

type Props = OwnProps;

let setViewingTermTimeout: ReturnType<typeof setTimeout> | null;

const TermObserver: React.FC<PropsWithChildren<Props>> = ({ index, children }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const dispatch = useDispatch();

  const handleTermVisible = (index: number) => {
    if (setViewingTermTimeout) {
      clearTimeout(setViewingTermTimeout);
    }
    setViewingTermTimeout = setTimeout(() => {
      dispatch(setViewingTermAction(index));
    }, 200);
  };

  if (inView) {
    // console.log(index);
    handleTermVisible(index);
  }

  return <span ref={ref}>{children}</span>;
};

export default TermObserver;
