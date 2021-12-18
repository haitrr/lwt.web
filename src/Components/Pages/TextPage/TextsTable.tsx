import React from "react";
import Table from "@mui/material/Table";
import { connect } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import {
  deleteTextAction,
  getTextsAction,
  loadTermCountAction,
} from "../../../Actions/TextAction";
import TextActions from "./TextActions";
import TextProgress from "./TextProgress";
import { Language, RootState } from "../../../RootReducer";
import { TextItem } from "../../../Reducers/TextReducer";
import TermNumber from "./TermNumber";
import { TermLearningLevel } from "../../../Enums";
import TextStatus from "./TextStatus";
import TotalTerm from "./TotalTerm";
import styles from './TextsTable.module.scss'
import useLanguages from "../../../Hooks/useLanguages";

dayjs.extend(relativeTime);
dayjs.extend(utc);

interface TextsTableProps {
  texts: TextItem[];
  onEdit: Function;
  isLoading: boolean;
}

const getTextLanguage = (language: string, languages: Language[]) => {
  const lang = languages.find((l) => l.code === language);
  if (lang) {
    return lang.name;
  }
  return "Unknown language";
};

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

const TextsTable: React.FC<TextsTableProps> = ({
  isLoading,
  onEdit,
  texts,
}) => {
  const { data: languages } = useLanguages();
  if (!languages) {
    return <Loading />
  }

  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>C</TableCell>
              <TableCell>P</TableCell>
              <TableCell>UK</TableCell>
              <TableCell>WK</TableCell>
              <TableCell>Act</TableCell>
              <TableCell>L1</TableCell>
              <TableCell>L2</TableCell>
              <TableCell>L3</TableCell>
              <TableCell>L4</TableCell>
              <TableCell>L5</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>I</TableCell>
              <TableCell>T</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {texts.map((text) => (
              <TableRow key={text.id}>
                <TableCell>
                  <div
                    className={styles.title}
                    style={{
                      maxHeight: "5rem",
                      display: "flex",
                      justifyContent: "center",
                      overflow: "scroll",
                      scrollbarWidth: "none",
                    }}
                  >
                    {text.title}
                  </div>
                </TableCell>
                <TableCell align="center">
                  {dayjs.utc(text.createdAt).fromNow()}
                </TableCell>
                <TableCell>
                  <TextProgress text={text} />
                </TableCell>
                <TableCell>
                  <TermNumber
                    text={text}
                    learningLevel={TermLearningLevel.UnKnow}
                  />
                </TableCell>
                <TableCell>
                  <TermNumber
                    text={text}
                    learningLevel={TermLearningLevel.WellKnow}
                  />
                </TableCell>
                <TableCell align="center" style={{ padding: 0 }}>
                  <TextActions text={text} onEdit={onEdit} />
                </TableCell>
                <TableCell>
                  <TermNumber
                    text={text}
                    learningLevel={TermLearningLevel.Learning1}
                  />
                </TableCell>
                <TableCell>
                  <TermNumber
                    text={text}
                    learningLevel={TermLearningLevel.Learning2}
                  />
                </TableCell>
                <TableCell>
                  <TermNumber
                    text={text}
                    learningLevel={TermLearningLevel.Learning3}
                  />
                </TableCell>
                <TableCell>
                  <TermNumber
                    text={text}
                    learningLevel={TermLearningLevel.Learning4}
                  />
                </TableCell>
                <TableCell>
                  <TermNumber
                    text={text}
                    learningLevel={TermLearningLevel.Learning5}
                  />
                </TableCell>
                <TableCell>
                  <TextStatus text={text} />
                </TableCell>
                <TableCell>
                  {getTextLanguage(text.languageCode, languages)}
                </TableCell>
                <TableCell>
                  {text.counts ? text.counts[TermLearningLevel.Ignored] : "-"}
                </TableCell>
                <TableCell>
                  <TotalTerm value={text.counts} record={text} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
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
  }),
  {
    getTexts: getTextsAction,
    deleteText: deleteTextAction,
    getTermCount: loadTermCountAction,
  }
)(TextsTable);
