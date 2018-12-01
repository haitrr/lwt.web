import { Button, Pagination, Table } from "antd";
import * as React from "react";
import { connect, ConnectedComponentClass } from "react-redux";
import { Link } from "react-router-dom";
import { getLanguageAction } from "../../../Actions/LanguageAction";
import { getTextsAction } from "../../../Actions/TextAction";
import { TextFilterForm } from "../../Forms/TextFilterForm";
import { TextCreateModal } from "../../Modals/TextCreateModal";

interface ITextPageProps {
  texts: object[];
  filters: object;
  page: number;
  itemPerPage: number;
  total: number;
  languages: any[];
  getTexts(filters: object, page: number, itemPerPage: number): any;
  getLanguages(): void;
}

interface ITextPageState {
  createModalVisible: boolean;
}

/**
 * text page
 */
class TextPage extends React.Component<ITextPageProps, ITextPageState> {
  public columns: any[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (value: any): any =>
        this.props.languages.filter((language: any) => language.id === value)[0]
          .name
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, text: any): any => {
        return (
          <span>
            <Link to={`/text/read/${text.id}`}>Read</Link>
          </span>
        );
      }
    }
  ];
  public constructor(props: ITextPageProps) {
    super(props);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.filterTexts = this.filterTexts.bind(this);
    this.state = { createModalVisible: false };
  }
  public componentDidMount(): void {
    const { filters, itemPerPage, getLanguages } = this.props;
    this.props.getTexts(filters, 1, itemPerPage);
    getLanguages();
  }

  public filterTexts(filters: object): void {
    const { page, itemPerPage } = this.props;
    this.props.getTexts(filters, page, itemPerPage);
  }

  public showCreateModal(): void {
    this.setState({ ...this.state, createModalVisible: true });
  }

  public hideCreateModal(): void {
    this.setState({ ...this.state, createModalVisible: false });
  }

  public handlePageChange(page: number): void {
    const { filters, itemPerPage } = this.props;
    this.props.getTexts(filters, page, itemPerPage);
  }

  public render(): React.ReactNode {
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

const connectedTextPage: ConnectedComponentClass<
  typeof TextPage,
  Pick<{}, never>
> = connect(
  (state: any) => {
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
