import { Component } from "react";
import { connect, ConnectedComponentClass } from "react-redux";

/**
 * text page
 */
class TextPage extends Component {
  public render(): React.ReactNode {
    return "Text Page";
  }
}

const connectedTextPage: ConnectedComponentClass<
  typeof TextPage,
  Pick<{}, never>
> = connect(
  null,
  null
)(TextPage);
export { connectedTextPage as TextPage };
