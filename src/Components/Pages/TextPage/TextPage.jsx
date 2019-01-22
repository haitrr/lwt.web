import { Button, Pagination, Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getLanguageAction } from "../../../Actions/LanguageAction";
import { getTextsAction } from "../../../Actions/TextAction";
import { TextFilterForm } from "../../Forms/TextFilterForm";
import TextCreateModal from "../../Modals/TextCreateModal";
import { TermLearningLevel } from "../../../Enums";

/**
 * text page
 */
class TextPage extends React.Component {
  columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: value => {
        const language = this.props.languages.find(
          language => language.id === value
        );
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
      render: (value, record) => this.renderTermNumber(value, record, "UnKnow")
    },
    {
      title: "Learning1",
      key: "Learning1",
      dataIndex: "counts.Learning1",
      render: (value, record) =>
        this.renderTermNumber(value, record, "Learning1")
    },
    {
      title: "Learning2",
      key: "Learning2",
      dataIndex: "counts.Learning2",
      render: (value, record) =>
        this.renderTermNumber(value, record, "Learning2")
    },
    {
      title: "Learning3",
      key: "Learning3",
      dataIndex: "counts.Learning3",
      render: (value, record) =>
        this.renderTermNumber(value, record, "Learning3")
    },
    {
      title: "Learning4",
      key: "Learning4",
      dataIndex: "counts.Learning4",
      render: (value, record) =>
        this.renderTermNumber(value, record, "Learning4")
    },
    {
      title: "Learning5",
      key: "Learning5",
      dataIndex: "counts.Learning5",
      render: (value, record) =>
        this.renderTermNumber(value, record, "Learning5")
    },
    {
      title: "WellKnow",
      key: "WellKnow",
      dataIndex: "counts.WellKnow",
      render: (value, record) =>
        this.renderTermNumber(value, record, "WellKnow")
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
      render: value => {
        let sum = 0;
        Object.keys(value).map(key => {
          sum += value[key];
          return null;
        });
        return sum;
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

  renderTermNumber(current, record, level) {
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

  filterTexts(filters) {
    const { page, itemPerPage } = this.props;
    this.props.getTexts(filters, page, itemPerPage);
  }

  showCreateModal() {
    this.setState({ ...this.state, createModalVisible: true });
  }

  hideCreateModal() {
    this.setState({ ...this.state, createModalVisible: false });
  }

  handlePageChange(page) {
    const { filters, itemPerPage } = this.props;
    this.props.getTexts(filters, page, itemPerPage);
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

const connectedTextPage = connect(
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
export { connectedTextPage as TextPage };
