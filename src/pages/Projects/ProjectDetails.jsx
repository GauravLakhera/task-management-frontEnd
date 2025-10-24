import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { toast } from 'react-hot-toast';
import api from '@/services/api';
import CreateTaskModal from '../../components/dashboard/CreateTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectSelector } from './selector';
import { getProjectDetails } from '@/store/redux/slices/project';
import AddMembers from './AddMembers';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [addMembersOpen, setAddMemberOpen] = useState(false);

  const dispatch = useDispatch();
  const selector = ProjectSelector();
  const { loading, projectDetails } = useSelector(selector);

  // Fetch project details
  const fetchProject = async (projectId) => {
    dispatch(getProjectDetails({ id: projectId }));
  };

  useEffect(() => {
    setProject(projectDetails);
  }, [projectDetails]);

  useEffect(() => {
    fetchProject(projectId);
  }, [projectId]);

  if (loading) return <p className='p-6'>Loading project details...</p>;
  if (!project) return <p className='p-6'>Project not found.</p>;

  // Render user card
  const renderUserCard = (title, user) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center space-x-3'>
        <div
          className='h-10 w-10 flex items-center justify-center rounded-full text-white font-semibold text-sm'
          style={{ backgroundColor: user?.profileColor || '#999' }}
        >
          {user?.firstName?.[0] || '?'}
        </div>
        <div>
          <p className='font-medium'>
            {user?.firstName} {user?.lastName}
          </p>
          <p className='text-sm text-gray-500'>{user?.email}</p>
        </div>
      </CardContent>
    </Card>
  );

  const handleCloseAddMember = () => {
    setAddMemberOpen(false);
  };

  return (
    <>
      <AddMembers
        isOpen={addMembersOpen}
        onClose={handleCloseAddMember}
        projectId={projectId}
      />
      <div className='p-6 space-y-8 md:w-10/12 mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-3xl font-bold mb-1 flex items-center gap-3'>
              {project.projectIcon ? (
                <img
                  src={project.projectIcon}
                  alt='icon'
                  className='w-8 h-8 rounded'
                />
              ) : (
                <span className='inline-flex items-center justify-center w-8 h-8 rounded bg-gray-200 text-gray-700 font-semibold'>
                  {project.key?.[0] || '?'}
                </span>
              )}
              {project.name}
            </h1>
            <p className='text-gray-600 max-w-2xl'>{project.description}</p>
          </div>
          <Button variant='outline' onClick={() => navigate('/dashboard')}>
            ← Back
          </Button>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3'>
          <Button onClick={() => setTaskModalOpen(true)}>Create Task</Button>
          <Button
            className={`cursor-pointer`}
            onClick={() => setAddMemberOpen(true)}
            variant='secondary'
          >
            Add Member
          </Button>
        </div>

        {/* Task Modal */}
        <CreateTaskModal
          isOpen={taskModalOpen}
          onClose={() => setTaskModalOpen(false)}
          projectId={projectId}
        />

        {/* Quick Info */}
        <div className='grid md:grid-cols-3 gap-4 mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <span
                className={`capitalize px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : project.status === 'on-hold'
                      ? 'bg-yellow-100 text-yellow-700'
                      : project.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                }`}
              >
                {project.status}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Key</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-lg font-semibold'>{project.key}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issue Sequence</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.issueSeq || 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* People Section */}
        <div className='grid md:grid-cols-2 gap-4 mt-4'>
          {renderUserCard('Manager', project.manager)}
          {renderUserCard('Default Assignee', project.defaultAssignee)}
        </div>

        {/* Dates */}
        <div className='grid md:grid-cols-2 gap-4 mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Start Date:</strong>{' '}
                {project.startDate
                  ? new Date(project.startDate).toLocaleDateString()
                  : '—'}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {project.endDate
                  ? new Date(project.endDate).toLocaleDateString()
                  : '—'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Created & Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(project.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{' '}
                {new Date(project.updatedAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Created By / Updated By */}
        <div className='grid md:grid-cols-2 gap-4 mt-4'>
          {renderUserCard('Created By', project.createdBy)}
          {renderUserCard('Last Updated By', project.updatedBy)}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
