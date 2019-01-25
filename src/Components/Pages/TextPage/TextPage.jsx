import PropTypes from "prop-types";
import { Button, Pagination, Popover, Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PieChart } from "react-chartkick";
import { getLanguageAction } from "../../../Actions/LanguageAction";
import { getTextsAction } from "../../../Actions/TextAction";
import { TextFilterForm } from "../../Forms/TextFilterForm";
import TextCreateModal from "../../Modals/TextCreateModal";
import { TermLearningLevel } from "../../../Enums";
import styles from "./TextPage.module.scss";

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
    <span className={`term-${TermLearningLevel[level]}`}>
      {`${current}(${Math.round((current / sum) * 100)}%)`}
    </span>
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
      fixed: "left",
      width: 200,
      render: (value, record) => {
        let sum = 0;
        Object.keys(value).map(key => {
          sum += value[key];
          return null;
        });
        return (
          <Popover
            content={
              <PieChart width="50vw" height="50vh" data={record.counts} />
            }
          >
            {sum}
          </Popover>
        );
      }
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
      title: "Actions",
      key: "actions",
      render: (_, text) => (
        <span>
          <Link to={`/text/read/${text.id}`}>Read</Link>
        </span>
      )
    },
    {
      title: "Unknow",
      key: "unknow",
      dataIndex: "counts.UnKnow",
      render: (value, record) => renderTermNumber(value, record, "UnKnow")
    },
    {
      title: "Learning1",
      key: "Learning1",
      dataIndex: "counts.Learning1",
      render: (value, record) => renderTermNumber(value, record, "Learning1")
    },
    {
      title: "Learning2",
      key: "Learning2",
      dataIndex: "counts.Learning2",
      render: (value, record) => renderTermNumber(value, record, "Learning2")
    },
    {
      title: "Learning3",
      key: "Learning3",
      dataIndex: "counts.Learning3",
      render: (value, record) => renderTermNumber(value, record, "Learning3")
    },
    {
      title: "Learning4",
      key: "Learning4",
      dataIndex: "counts.Learning4",
      render: (value, record) => renderTermNumber(value, record, "Learning4")
    },
    {
      title: "Learning5",
      key: "Learning5",
      dataIndex: "counts.Learning5",
      render: (value, record) => renderTermNumber(value, record, "Learning5")
    },
    {
      title: "WellKnow",
      key: "WellKnow",
      dataIndex: "counts.WellKnow",
      render: (value, record) => renderTermNumber(value, record, "WellKnow")
    },
    {
      title: "Ignored",
      key: "Ignored",
      dataIndex: "counts.Ignored"
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "counts",
      render: (value, record) => {
        let sum = 0;
        Object.keys(value).map(key => {
          sum += value[key];
          return null;
        });
        return (
          <Popover
            content={
              <PieChart width="50vw" height="50vh" data={record.counts} />
            }
          >
            {sum}
          </Popover>
        );
      }
    }
  ];

  constructor(props) {
    super(props);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.filterTexts = this.filterTexts.bind(this);
    this.state = { createModalVisible: false };
  }

  componentDidMount() {
    const { filters, getTexts, itemPerPage, getLanguages } = this.props;
    getTexts(filters, 1, itemPerPage);
    getLanguages();
  }

  handlePageChange(page) {
    const { filters, itemPerPage, getTexts } = this.props;
    getTexts(filters, page, itemPerPage);
  }

  filterTexts(filters) {
    const { page, getTexts, itemPerPage } = this.props;
    getTexts(filters, page, itemPerPage);
  }

  showCreateModal() {
    this.setState(prevState => ({ ...prevState, createModalVisible: true }));
  }

  hideCreateModal() {
    this.setState(prevState => ({ prevState, createModalVisible: false }));
  }

  render() {
    const { texts, filters, page, total, languages } = this.props;
    const { createModalVisible } = this.state;

    return (
      <React.Fragment>
        <TextCreateModal
          onChange={this.filterTexts}
          hide={this.hideCreateModal}
          visible={createModalVisible}
        />
        <Button onClick={this.showCreateModal}>Add text</Button>
        <Button>Add long text</Button>
        <TextFilterForm languages={languages} value={filters} />
        <Table
          dataSource={texts}
          pagination={false}
          columns={this.columns}
          rowKey="id"
          className={styles.table}
          scroll={{ x: true }}
        />
        <Pagination
          total={total}
          current={page}
          hideOnSinglePage={false}
          onChange={this.handlePageChange}
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
    getLanguages: getLanguageAction
  }
)(TextPage);

TextPage.propTypes = {
  filters: PropTypes.shape(),
  getLanguages: PropTypes.func.isRequired,
  getTexts: PropTypes.func.isRequired,
  itemPerPage: PropTypes.number.isRequired,
  languages: PropTypes.arrayOf().isRequired,
  page: PropTypes.number.isRequired,
  texts: PropTypes.arrayOf().isRequired,
  total: PropTypes.number.isRequired
};

TextPage.defaultProps = {
  filters: null
};
