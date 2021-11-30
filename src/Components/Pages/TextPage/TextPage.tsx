import {Button} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import {connect} from "react-redux";
import {getLanguageAction} from "../../../Actions/LanguageAction";
import {
  deleteTextAction,
  getTextsAction,
  loadTermCountAction, TextFilter,
} from "../../../Actions/TextAction";
import TextFilterForm from "../../Forms/TextFilterForm";
import TextCreateModal from "../../Modals/TextCreateModal";
import TextEditModal from "../../Modals/TextEditModal";
import {parseQueryString} from "../../../Utilities/queryString";
import TextsTable from "./TextsTable";
import {RootState} from "../../../RootReducer";

interface Props {
  filters: TextFilter
  total: number
  history: any
  page: number
  location: any
  itemPerPage: number
  getLanguages: Function
  getTexts: Function
}

/**
 * text page
 */
const TextPage: React.FC<Props> = ({filters, total, history, page, location, itemPerPage, getLanguages, getTexts}) => {
  const [createModalVisible, setCreateModalVisible] = React.useState(false)
  const [editModalVisible, setEditModalVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [editingText, setEditingText] = React.useState<number | null>(null)
  React.useEffect(() => {
    const query = parseQueryString(location.search);
    if (query.page) {
      loadingAndGetTexts(filters, parseInt(query.page, 10), itemPerPage);
    } else {
      loadingAndGetTexts(filters, 1, itemPerPage);
    }
    getLanguages();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onEdit = () => {
    filterTexts();
    setEditingText(null)
  };

  const loadingAndGetTexts = (filters: TextFilter | undefined, page: number, itemPerPage: number) => {
    if (!isLoading) {
      setIsLoading(true)
    }
    getTexts(filters, page, itemPerPage).then(() => {
      setIsLoading(false)
    });
  };

  React.useEffect(() => {
    const query = parseQueryString(location.search);
    if (query.page) {
      const newPage = parseInt(query.page, 10);
      if (newPage !== page) {
        if (!isLoading) {
          setIsLoading(true)
        }
        getTexts(filters, page, itemPerPage).then(() => {
          setIsLoading(false)
        });
      }
    }
  }, [location.search, filters, itemPerPage, page, getTexts, isLoading])


  const hideEditModal = () => {
    setEditModalVisible(false);
  };

  const handleEdit = (textId: number) => {
    setEditingText(textId)
    setEditModalVisible(true)
  };

  const handlePageChange = (_: any, page: number) => {
    history.push(`/text?page=${page.toString()}`);
  }

  const filterTexts = (filters?: TextFilter) => {
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
      <TextFilterForm onFilterChange={filterTexts} values={filters}/>
      <TextsTable isLoading={isLoading} onEdit={handleEdit}/>
      <Pagination
        count={Math.ceil(total / 10)}
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
}

TextPage.defaultProps = {
  filters: {
    title: "",
    languageCode: "",
  },
}

export default connect(
  (state: RootState) => ({
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