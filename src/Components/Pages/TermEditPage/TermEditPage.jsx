import React from "react";

/**
 * term edit page.
 */
class TermEditPage extends React.Component {
  render() {
    const { term } = this.props;

    return (
      <div>
        <p>{term.content}</p>
        <p>{term.meaning}</p>
        <p>{term.learningLevel}</p>
      </div>
    );
  }
}

export { TermEditPage };
