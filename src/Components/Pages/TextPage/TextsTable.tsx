import React from "react";
import Table from "@material-ui/core/Table";
import { connect } from "react-redux";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  deleteTextAction,
  getTextsAction,
  loadTermCountAction,
} from "../../../Actions/TextAction";
import { getLanguageAction } from "../../../Actions/LanguageAction";
import { RootState } from "../../Inputs/LanguageSelect/LanguageSelect";
import TextActions from "./TextActions";

export interface Text {
  title: string;
  id: number;
  processedTermCount: number;
}

export interface TextState {
  total: any;
  itemPerPage: any;
  page: any;
  filters: any;
  texts: Text[];
}

interface TextsTableProps {
  texts: Text[];
  onDelete: Function;
  onEdit: Function;
}

const TextsTable: React.FC<TextsTableProps> = (props) => {
  const { texts, onDelete, onEdit } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Act</TableCell>
            <TableCell>P</TableCell>
            <TableCell>UK</TableCell>
            <TableCell>L1</TableCell>
            <TableCell>L2</TableCell>
            <TableCell>L3</TableCell>
            <TableCell>L4</TableCell>
            <TableCell>L5</TableCell>
            <TableCell>WK</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>I</TableCell>
            <TableCell>T</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {texts.map((text) => (
            <TableRow key={text.id}>
              <TableCell component="th" scope="row">
                {text.title}
              </TableCell>
              <TableCell>
                <TextActions text={text} onDelete={onDelete} onEdit={onEdit} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
)(TextsTable);
