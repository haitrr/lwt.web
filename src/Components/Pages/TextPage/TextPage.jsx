import PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import {connect} from "react-redux";
import {getLanguageAction} from "../../../Actions/LanguageAction";
import {
  deleteTextAction,
  getTextsAction,
  loadTermCountAction,
} from "../../../Actions/TextAction";
import TextFilterForm from "../../Forms/TextFilterForm";
import TextCreateModal from "../../Modals/TextCreateModal";
import TextEditModal from "../../Modals/TextEditModal";
import {parseQueryString} from "../../../Utilities/queryString";
import TextsTable from "./TextsTable";

/**
 * text page
 */
const TextPage = ({filters, total, history, page, location, itemPerPage, getLanguages, getTexts}) => {
  const [createModalVisible, setCreateModalVisible] = React.useState(false)
  const [editModalVisible, setEditModalVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [editingText, setEditingText] = React.useState(null)
  React.useEffect(() => {
    const query = parseQueryString(location.search);
    if (query.page) {
      loadingAndGetTexts(filters, parseInt(query.page, 10), itemPerPage);
    } else {
      loadingAndGetTexts(filters, 1, itemPerPage);
    }
    getLanguages();
  }, [])

  React.useEffect(() => {
    const query = parseQueryString(location.search);
    if (query.page) {
      const newPage = parseInt(query.page, 10);
      if (newPage !== page) {
        loadingAndGetTexts(filters, newPage, itemPerPage);
      }
    }
  }, [location.search])

  const onEdit = () => {
    filterTexts();
    setEditingText(null)
  };

  const loadingAndGetTexts = (filters, page, itemPerPage) => {
    if (!isLoading) {
      setIsLoading(true)
    }
    getTexts(filters, page, itemPerPage).then(() => {
      setIsLoading(false)
    });
  };

  const hideEditModal = () => {
    setEditModalVisible(false);
  };

  const handleEdit = (textId) => {
    setEditingText(textId)
    setEditModalVisible(true)
  };

  const handlePageChange = (_, page) => {
    history.push(`/text?page=${page.toString()}`);
  }

  const filterTexts = (filters) => {
    loadingAndGetTexts(filters, 1, itemPerPage);
  }

  const hideCreateModal = () => {
    setCreateModalVisible(false)
  }

  const showCreateModal = () => {
    setCreateModalVisible(true)
  }

  return (
    <>
      <TextEditModal
        hide={hideEditModal}
        onEdit={onEdit}
        editingText={editingText}
        visible={editModalVisible}
      />
      <TextCreateModal
        onChange={filterTexts}
        hide={hideCreateModal}
        visible={createModalVisible}
        onCreate={filterTexts}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={showCreateModal}
      >
        Add text
      </Button>
      <TextFilterForm onFilterChange={filterTexts} value={filters}/>
      <TextsTable isLoading={isLoading} onEdit={handleEdit}/>
      <Pagination
        count={Math.ceil(total / 10)}
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
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
  location: PropTypes.shape({search: PropTypes.string}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

TextPage.defaultProps = {
  filters: null,
};
