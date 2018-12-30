import { Button, Pagination, Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getLanguageAction } from "../../../Actions/LanguageAction";
import { getTextsAction } from "../../../Actions/TextAction";
import { TextFilterForm } from "../../Forms/TextFilterForm";
import { TextCreateModal } from "../../Modals/TextCreateModal";

/**
 * text page
 */
class TextPage extends React.Component {
  columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
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
      render: (_, text) => {
        return (
          <span>
            <Link to={`/text/read/${text.id}`}>Read</Link>
          </span>
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
  state => {
    return {
      texts: state.text.texts,
      filters: state.text.filters,
      page: state.text.page,
      itemPerPage: state.text.itemPerPage,
      total: state.text.total,
      languages: state.language.languages
    };
  },
  {
    getTexts: getTextsAction,
    getLanguages: getLanguageAction
  }
)(TextPage);
export { connectedTextPage as TextPage };
