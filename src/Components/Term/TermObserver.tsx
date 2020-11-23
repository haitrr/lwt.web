import React, { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";
import { connect } from "react-redux";
import { setViewingTermAction } from "../../Actions/TextAction";
import { RootState } from "../../RootReducer";

interface OwnProps {
  index: number;
}

interface DispatchProps {
  setViewingTerm: (index: number) => void;
}

type Props = OwnProps & DispatchProps;

let setViewingTermTimeout: ReturnType<typeof setTimeout> | null;

const handleTermVisible = (
  setViewingTerm: (index: number) => void,
  index: number
) => {
  if (setViewingTermTimeout) {
    clearTimeout(setViewingTermTimeout);
  }
  setViewingTermTimeout = setTimeout(() => {
    setViewingTerm(index);
  }, 200);
};

const TermObserver: React.FC<PropsWithChildren<Props>> = ({
  index,
  children,
  setViewingTerm,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  if (inView) {
    handleTermVisible(setViewingTerm, index);
  }

  return <span ref={ref}>{children}</span>;
};

export default connect<void, DispatchProps, OwnProps, RootState>(null, {
  setViewingTerm: setViewingTermAction,
})(TermObserver);
