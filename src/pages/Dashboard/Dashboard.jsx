import React, { useState, useEffect } from 'react';
import CreateProjectModal from '../../components/dashboard/CreateProjectModal';
import api from '../../services/api';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardSelector } from './selector';
import { getProjectList } from '@/store/redux/slices/dashboards';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const selector = DashboardSelector();
  const { loading, projectList } = useSelector(selector);

  const fetchProjects = async () => {
    dispatch(getProjectList());
  };

  useEffect(() => {
    setProjects(projectList);
  }, [projectList]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectClick = (id) => {
    localStorage.setItem('project', id);
    navigate(`/project/${id}`);
  };

  return (
    <div className='p-6  md:w-10/12 mx-auto'>
      <div className='flex justify-between mb-6'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <Button onClick={() => setModalOpen(true)}>+ Create New Project</Button>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {projects?.map((p) => (
            <div
              key={p._id}
              onClick={() => handleProjectClick(p.projectId)}
              className='p-4 border border-black/30 rounded hover:shadow-md cursor-pointer transition'
            >
              <h3 className='font-bold text-lg'>{p.name}</h3>
              <p className='text-sm text-gray-600 line-clamp-2'>
                {p.description}
              </p>
              <p className='mt-2 text-sm'>
                <span className='font-semibold'>Status:</span> {p.status}
              </p>
            </div>
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchProjects}
      />
    </div>
  );
};

export default Dashboard;
