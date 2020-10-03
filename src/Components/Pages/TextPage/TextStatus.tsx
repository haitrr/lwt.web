import React, { FC } from "react";
import { connect } from "react-redux";
import {
  getTermCountAction,
  getProcessedIndexAction,
} from "../../../Actions/TextAction";
import { TextItemState } from "../../../Reducers/TextReducer";

interface OwnProps {
  text: TextItemState;
  getProcessedIndex: (id: number) => void;
}

type TextStatusProps = OwnProps;

const TextStatus: FC<TextStatusProps> = ({ text, getProcessedIndex }) => {
  const [
    getProcessedTermCountInterval,
    setGetProcessedTermCountInterval,
  ] = React.useState<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (getProcessedTermCountInterval) {
        clearInterval(getProcessedTermCountInterval);
      }
    },
    [getProcessedTermCountInterval]
  );

  React.useEffect(() => {
    if (text.processedIndex < text.length - 1) {
      if (!getProcessedTermCountInterval) {
        const interval = setInterval(() => {
          getProcessedIndex(text.id);
        }, 2000);
        setGetProcessedTermCountInterval(interval);
      }
    } else if (getProcessedTermCountInterval) {
      clearInterval(getProcessedTermCountInterval);
    }
  }, [
    getProcessedIndex,
    getProcessedTermCountInterval,
    text.id,
    text.processedIndex,
    text.length,
  ]);

  if (text.processedIndex === -1) {
    return <span style={{ backgroundColor: "#ffd78c" }}>Processing</span>;
  }
  if (text.processedIndex === text.length - 1) {
    return <span style={{ backgroundColor: "#a9ff8c" }}>Done</span>;
  }
  return (
    <span style={{ backgroundColor: "#f7f18b" }}>
      {`${text.processedIndex}/${text.length}(${Math.floor(
        (text.processedIndex * 100) / text.length
      )}%)`}
    </span>
  );
};

export default connect(null, {
  getTermCount: getTermCountAction,
  getProcessedIndex: getProcessedIndexAction,
})(TextStatus);
