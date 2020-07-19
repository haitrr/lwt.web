import PropTypes from "prop-types";
import { Button, Icon, Pagination, Popconfirm, Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getLanguageAction } from "../../../Actions/LanguageAction";
import { deleteTextAction, getTextsAction } from "../../../Actions/TextAction";
import TextFilterForm from "../../Forms/TextFilterForm";
import TextCreateModal from "../../Modals/TextCreateModal";
import TextEditModal from "../../Modals/TextEditModal";
import { TermLearningLevel } from "../../../Enums";
import styles from "./TextPage.module.scss";
import termStyles from "../../Term/Term.module.scss";
import { parseQueryString } from "../../../Utilities/queryString";

function renderTermNumber(current, record, level) {
  if (!current) {
    return 0;
  }
  const { counts } = record;
  let sum = 0;
  Object.keys(counts).map(key => {
    if (key !== "Ignored") {
      sum += counts[key];
    }
    return null;
  });
  return (
    <div className={`${termStyles[`term-${TermLearningLevel[level]}`]}`}>
      {`${current}`}
      <br />
      ~
      <br />
      {`${Math.round((current / sum) * 100)}%`}
    </div>
  );
}

/**
 * text page
 */
class TextPage extends React.Component {
  columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30vw"
    },
    {
      title: "Act",
      key: "actions",
      width: "auto",
      render: (_, text) => (
        <span>
          <Link className={styles.actionButton} to={`/text/read/${text.id}`}>
            <Icon type="read" />
          </Link>
          <Popconfirm
            title="Confirm to delete this text."
            onConfirm={() => this.handleDelete(text.id)}
            okText="Delete"
            okType="danger"
          >
            <Icon type="delete" className={styles.deleteButton} />
          </Popconfirm>
          <Icon
            type="edit"
            className={styles.editButton}
            onClick={() => this.handleEdit(text.id)}
          />
        </span>
      )
    },
    {
      title: "UK",
      key: "unknow",
      dataIndex: "counts.UnKnow",
      render: (value, record) => renderTermNumber(value, record, "UnKnow")
    },
    {
      title: "L1",
      key: "Learning1",
      dataIndex: "counts.Learning1",
      render: (value, record) => renderTermNumber(value, record, "Learning1")
    },
    {
      title: "L2",
      key: "Learning2",
      dataIndex: "counts.Learning2",
      render: (value, record) => renderTermNumber(value, record, "Learning2")
    },
    {
      title: "L3",
      key: "Learning3",
      dataIndex: "counts.Learning3",
      render: (value, record) => renderTermNumber(value, record, "Learning3")
    },
    {
      title: "L4",
      key: "Learning4",
      dataIndex: "counts.Learning4",
      render: (value, record) => renderTermNumber(value, record, "Learning4")
    },
    {
      title: "L5",
      key: "Learning5",
      dataIndex: "counts.Learning5",
      render: (value, record) => renderTermNumber(value, record, "Learning5")
    },
    {
      title: "WK",
      key: "WellKnow",
      dataIndex: "counts.WellKnow",
      render: (value, record) => renderTermNumber(value, record, "WellKnow")
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: value => {
        const { languages } = this.props;
        const language = languages.find(lang => lang.id === value);
        if (language) {
          return language.name;
        }
        return "Unknown language";
      }
    },

    {
      title: "I",
      key: "Ignored",
      dataIndex: "counts.Ignored"
    },
    {
      title: "T",
      key: "total",
      dataIndex: "counts",
      render: value => {
        let sum = 0;
        Object.keys(value).map(key => {
          sum += value[key];
          return null;
        });
        return <span>{sum}</span>;
      }
    }
  ];

  constructor(props) {
    super(props);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.filterTexts = this.filterTexts.bind(this);
    this.state = {
      createModalVisible: false,
      editModalVisible: false,
      isLoading: true
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
    this.setState(state => ({ ...state, editingText: null }));
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
    this.setState(prevState => ({ prevState, editModalVisible: false }));
  };

  handleDelete = textId => {
    const { deleteText } = this.props;
    deleteText(textId);
  };

  handleEdit = textId => {
    this.setState(state => ({
      ...state,
      editingText: textId,
      editModalVisible: true
    }));
  };

  handlePageChange(page) {
    const { history } = this.props;
    history.push(`/text?page=${page.toString()}`);
  }

  filterTexts(filters) {
    const { page, itemPerPage } = this.props;
    this.loadingAndGetTexts(filters, page, itemPerPage);
  }

  hideCreateModal() {
    this.setState(prevState => ({ prevState, createModalVisible: false }));
  }

  showCreateModal() {
    this.setState(prevState => ({ ...prevState, createModalVisible: true }));
  }

  render() {
    const { texts, filters, page, total, languages } = this.props;
    const {
      isLoading,
      createModalVisible,
      editModalVisible,
      editingText
    } = this.state;

    return (
      <React.Fragment>
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
        <Button onClick={this.showCreateModal}>Add text</Button>
        <TextFilterForm
          onFilterChange={this.filterTexts}
          languages={languages}
          value={filters}
        />
        <Table
          dataSource={texts}
          pagination={false}
          loading={isLoading}
          columns={this.columns}
          rowKey="id"
          className={styles.table}
          rowClassName={styles.row}
          scroll={{ x: 1000 }}
        />
        <Pagination
          total={total}
          current={page}
          hideOnSinglePage={false}
          onChange={this.handlePageChange}
          showQuickJumper
        />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    texts: state.text.texts,
    filters: state.text.filters,
    page: state.text.page,
    itemPerPage: state.text.itemPerPage,
    total: state.text.total,
    languages: state.language.languages
  }),
  {
    getTexts: getTextsAction,
    getLanguages: getLanguageAction,
    deleteText: deleteTextAction
  }
)(TextPage);

TextPage.propTypes = {
  filters: PropTypes.shape(),
  getLanguages: PropTypes.func.isRequired,
  getTexts: PropTypes.func.isRequired,
  deleteText: PropTypes.func.isRequired,
  itemPerPage: PropTypes.number.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  page: PropTypes.number.isRequired,
  texts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  total: PropTypes.number.isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  history: PropTypes.shape({}).isRequired
};

TextPage.defaultProps = {
  filters: null
};
