import { Button, Pagination, Table } from "antd";
import * as React from "react";
import { connect, ConnectedComponentClass } from "react-redux";
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
    }
  ];
  public constructor(props: ITextPageProps) {
    super(props);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.state = { createModalVisible: false };
  }
  public componentDidMount(): void {
    const { filters, page, itemPerPage } = this.props;
    this.props.getTexts(filters, page, itemPerPage);
  }

  public showCreateModal(): void {
    this.setState({ ...this.state, createModalVisible: true });
  }

  public render(): React.ReactNode {
    const { texts, filters, page, total, languages } = this.props;
    const { createModalVisible } = this.state;

    return (
      <React.Fragment>
        <TextCreateModal visible={createModalVisible} />
        <Button onClick={this.showCreateModal}>Add text</Button>
        <Button>Add long text</Button>
        <TextFilterForm languages={languages} value={filters} />
        <Table dataSource={texts} pagination={false} columns={this.columns} />
        <Pagination total={total} current={page} hideOnSinglePage={true} />
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
    getTexts: getTextsAction
  }
)(TextPage);
export { connectedTextPage as TextPage };
