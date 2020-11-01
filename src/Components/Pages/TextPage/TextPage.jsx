import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { connect } from "react-redux";
import { getLanguageAction } from "../../../Actions/LanguageAction";
import {
  deleteTextAction,
  getTextsAction,
  loadTermCountAction,
} from "../../../Actions/TextAction";
import TextFilterForm from "../../Forms/TextFilterForm";
import TextCreateModal from "../../Modals/TextCreateModal";
import TextEditModal from "../../Modals/TextEditModal";
import { parseQueryString } from "../../../Utilities/queryString";
import TextsTable from "./TextsTable";

/**
 * text page
 */
class TextPage extends React.Component {
  constructor(props) {
    super(props);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.filterTexts = this.filterTexts.bind(this);
    this.state = {
      createModalVisible: false,
      editModalVisible: false,
      isLoading: true,
    };
    const { filters, location, itemPerPage } = props;
    const query = parseQueryString(location.search);
    if (query.page) {
      this.loadingAndGetTexts(filters, parseInt(query.page, 10), itemPerPage);
    } else {
      this.loadingAndGetTexts(filters, 1, itemPerPage);
    }
  }

  componentDidMount() {
    const { getLanguages } = this.props;
    getLanguages();
  }

  componentDidUpdate(prevProps) {
    const { filters, location, page, itemPerPage } = this.props;
    if (prevProps.location.search !== location.search) {
      const query = parseQueryString(location.search);
      if (query.page) {
        const newPage = parseInt(query.page, 10);
        if (newPage !== page) {
          this.loadingAndGetTexts(filters, newPage, itemPerPage);
        }
      }
    }
  }

  onEdit = () => {
    this.filterTexts();
    this.setState((state) => ({ ...state, editingText: null }));
  };

  loadingAndGetTexts = (filters, page, itemPerPage) => {
    const { isLoading } = this.state;
    const { getTexts } = this.props;
    if (!isLoading) {
      this.setState({ isLoading: true });
    }
    getTexts(filters, page, itemPerPage).then(() => {
      this.setState({ isLoading: false });
    });
  };

  hideEditModal = () => {
    this.setState((prevState) => ({ prevState, editModalVisible: false }));
  };

  handleDelete = (textId) => {
    const { deleteText } = this.props;
    deleteText(textId);
  };

  handleEdit = (textId) => {
    this.setState((state) => ({
      ...state,
      editingText: textId,
      editModalVisible: true,
    }));
  };

  handlePageChange(_, page) {
    const { history } = this.props;
    history.push(`/text?page=${page.toString()}`);
  }

  filterTexts(filters) {
    const { itemPerPage } = this.props;
    this.loadingAndGetTexts(filters, 1, itemPerPage);
  }

  hideCreateModal() {
    this.setState((prevState) => ({ prevState, createModalVisible: false }));
  }

  showCreateModal() {
    this.setState((prevState) => ({ ...prevState, createModalVisible: true }));
  }

  render() {
    const { filters, page, total } = this.props;
    const { createModalVisible, editModalVisible, editingText, isLoading } = this.state;

    return (
      <>
        <TextEditModal
          hide={this.hideEditModal}
          onEdit={this.onEdit}
          editingText={editingText}
          visible={editModalVisible}
        />
        <TextCreateModal
          onChange={this.filterTexts}
          hide={this.hideCreateModal}
          visible={createModalVisible}
          onCreate={this.filterTexts}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={this.showCreateModal}
        >
          Add text
        </Button>
        <TextFilterForm onFilterChange={this.filterTexts} value={filters} />
        <TextsTable isLoading={isLoading} onDelete={this.handleDelete} onEdit={this.handleEdit} />
        <Pagination
          count={Math.ceil(total / 10)}
          page={page}
          hideOnSinglePage={false}
          onChange={this.handlePageChange}
          showQuickJumper
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    texts: state.text.texts,
    filters: state.text.filters,
    page: state.text.page,
    itemPerPage: state.text.itemPerPage,
    total: state.text.total,
    languages: state.language.languages,
  }),
  {
    getTexts: getTextsAction,
    getLanguages: getLanguageAction,
    deleteText: deleteTextAction,
    getTermCount: loadTermCountAction,
  }
)(TextPage);

TextPage.propTypes = {
  filters: PropTypes.shape(),
  getLanguages: PropTypes.func.isRequired,
  getTexts: PropTypes.func.isRequired,
  deleteText: PropTypes.func.isRequired,
  itemPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  history: PropTypes.shape({}).isRequired,
};

TextPage.defaultProps = {
  filters: null,
};
