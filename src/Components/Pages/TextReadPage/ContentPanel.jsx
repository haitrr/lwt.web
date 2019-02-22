import PropTypes from "prop-types";
import React from "react";
import styles from "./TextReadPage.module.scss";
import Term from "../../Term";

class ContentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      begin: Math.max(
        Math.min(props.bookmark, props.terms.length - 500) - 20,
        0
      )
    };

    this.last = React.createRef();
    this.container = React.createRef();
  }

  shouldComponentUpdate(prevProps, prevState) {
    const { begin } = this.state;
    return prevState.begin !== begin;
  }

  componentDidUpdate(prevProps, prevState) {
    const { begin, last } = this.state;
    if (prevState.begin > begin) {
      this.container.current.scrollTop =
        last.offsetTop - this.container.current.offsetTop;
    }
  }

  handleScroll = e => {
    const { begin } = this.state;
    const { terms } = this.props;
    const bottom =
      e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 200;
    const top = e.target.scrollTop === 0;
    if (top) {
      if (begin > 0) {
        this.setState(prevState => ({
          ...prevState,
          begin: Math.max(prevState.begin - 500, 0),
          last: this.last.current
        }));
      }
      e.stopPropagation();
    }
    if (bottom) {
      if (begin + 1000 < terms.length)
        this.setState(prevState => ({
          ...prevState,
          begin: prevState.begin + 500
        }));
      e.stopPropagation();
    }
  };

  render() {
    const { terms, onTermClick, bookmarkRef } = this.props;
    const { begin } = this.state;
    return (
      <div
        onScroll={this.handleScroll}
        id="contentPanel"
        className={styles.contentPanel}
        ref={this.container}
      >
        {terms.slice(begin, begin + 1000).map((term, index) => {
          const realIndex = index + begin;
          return (
            <Term
              onTermClick={t => onTermClick(t, realIndex)}
              bookmarkRef={bookmarkRef}
              last={begin === realIndex ? this.last : null}
              // eslint-disable-next-line react/no-array-index-key
              key={realIndex}
              index={realIndex}
            />
          );
        })}
      </div>
    );
  }
}

ContentPanel.defaultProps = {
  bookmark: null
};

ContentPanel.propTypes = {
  bookmarkRef: PropTypes.shape({}).isRequired,
  onTermClick: PropTypes.func.isRequired,
  terms: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  bookmark: PropTypes.number
};
export default ContentPanel;
