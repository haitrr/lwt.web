import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React from 'react';
import { TextFilter } from '../../../Actions/TextAction';
import TextFilterForm from '../../Forms/TextFilterForm';
import TextCreateModal from '../../Modals/TextCreateModal';
import TextEditModal from '../../Modals/TextEditModal';
import { parseQueryString } from '../../../Utilities/queryString';
import TextsTable from './TextsTable';
import useTexts from '../../../Hooks/useTexts';
import { Helmet } from 'react-helmet';

interface Props {
  history: any;
  location: any;
}

/**
 * text page
 */
const TextPage: React.FC<Props> = ({ history, location }) => {
  const [createModalVisible, setCreateModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editingText, setEditingText] = React.useState<number | null>(null);
  const [filters, setFilters] = React.useState<TextFilter>({ title: '', languageCode: '' });
  const query = parseQueryString(location.search);
  const page = query.page ? parseInt(query.page, 10) : 1;
  const itemPerPage = 10;

  const { texts, isLoading, refetch } = useTexts(filters, page, itemPerPage);
  const onEdit = () => {
    refetch().then();
    setEditingText(null);
  };

  let queryPage = parseInt(query.page, 10);
  if (Number.isNaN(queryPage)) {
    queryPage = 1;
  }

  const hideEditModal = () => {
    setEditModalVisible(false);
  };

  const handleEdit = (textId: number) => {
    setEditingText(textId);
    setEditModalVisible(true);
  };

  const handlePageChange = (_: any, page: number) => {
    history.push(`/text?page=${page.toString()}`);
  };

  const hideCreateModal = () => {
    setCreateModalVisible(false);
  };

  const showCreateModal = () => {
    setCreateModalVisible(true);
  };

  return (
    <>
      <Helmet>
        <title>Lwt - Texts</title>
      </Helmet>
      <TextEditModal hide={hideEditModal} onEdit={onEdit} editingText={editingText} visible={editModalVisible} />
      <TextCreateModal hide={hideCreateModal} visible={createModalVisible} onCreate={refetch} />
      <Button color="primary" variant="contained" onClick={showCreateModal}>
        Add text
      </Button>
      <TextFilterForm onFilterChange={setFilters} values={filters} />
      <TextsTable isLoading={isLoading} onEdit={handleEdit} texts={texts?.items} reloadTexts={refetch} />
      <Pagination count={Math.ceil((texts?.total ?? 0) / 10)} page={page} onChange={handlePageChange} />
    </>
  );
};

export default TextPage;
