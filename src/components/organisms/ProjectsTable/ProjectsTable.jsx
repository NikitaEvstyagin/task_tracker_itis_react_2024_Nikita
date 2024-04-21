import Button from 'react-bootstrap/Button';

import { useState, useContext} from 'react';

import DeleteModal from '../../molecules/DeleteModal';

import { mockProjects } from './mockProjects';

import { Table, TableHead, TableCol, TableColActions } from './styled';
import NotifierContext from '../../../context/NotifierContext';

const ProjectsTable = ({projects}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { setMessage, setErrorMessage } = useContext(NotifierContext)

  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleDeleteButton = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  }

  const handleDeleteCancelButton = () => {
    setProjectToDelete(null);
    setErrorMessage('Проект не удален')
    setShowDeleteModal(false);
  }

  const handleDeleteConfirmButton = () => {
    
    setMessage('Проект удален');
    setShowDeleteModal(false);
  }

  return (
    <>
    <Table>
      <thead>
        <tr>
          <TableHead>id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </tr>
      </thead>

      <tbody>
        {projects.map(({ id, name, description }) => {
          return (
            <tr key={id}>
              <TableCol>{id}</TableCol>
              <TableCol>{name}</TableCol>
              <TableCol>{description}</TableCol>
              <TableColActions>
                <Button variant="light" onClick={() => {}}>Edit</Button>
                <Button variant="light" onClick={() => {}}>Show</Button>
                <Button variant="danger" onClick={() => {handleDeleteButton({ id, name, description })}}>Delete</Button>
              </TableColActions>
            </tr>
          )
        })}
      </tbody>
    </Table>

    { (showDeleteModal && (
      <DeleteModal text={`The project "${projectToDelete.name}" will be permanently deleted. Are you sure?`}
      onCancel={handleDeleteCancelButton}
      onDelete={handleDeleteConfirmButton}
      show={showDeleteModal} />))
    }
    </>
  );
};

export default ProjectsTable;
