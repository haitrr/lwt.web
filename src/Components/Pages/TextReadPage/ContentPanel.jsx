import PropTypes from "prop-types";
import React from "react";
import styles from "./TextReadPage.module.scss";
import { TermLearningLevel } from "../../../Enums";
import Term from "../../Term";

class ContentPanel extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { terms, onTermClick, bookmark } = this.props;
    return (
      <div id="contentPanel" className={styles.contentPanel}>
        {terms.map((term, index) => {
          if (term.learningLevel === TermLearningLevel.Skipped) {
            return term.content;
          }

          return (
            <Term
              onTermClick={t => onTermClick(t, index)}
              bookmarkRef={bookmark}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
            />
          );
        })}
      </div>
    );
  }
}

export default ContentPanel;

ContentPanel.propTypes = {
  bookmark: PropTypes.shape({}).isRequired,
  onTermClick: PropTypes.func.isRequired,
  terms: PropTypes.arrayOf(PropTypes.shape()).isRequired
};
