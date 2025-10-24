import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardSelector } from './selector';
import { getProjectList } from '@/store/redux/slices/dashboards';
import CreateProjectModal from '@/components/dashboard/CreateProjectModal';
import { ProjectCard } from '@/components/Dashboard/ProjectCard';
import { DashboardStats } from '@/components/Dashboard/DashboardStats';
import { DashboardEmptyState } from '@/components/Dashboard/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Loader2,
  LayoutGrid,
  List
} from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = DashboardSelector();
  const { loading, projectList } = useSelector(selector);

  const fetchProjects = async () => {
    dispatch(getProjectList());
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setProjects(projectList || []);
  }, [projectList]);

  // Filter projects based on search and status
  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, statusFilter]);

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  const handleCreateProject = () => {
    setModalOpen(true);
  };

  return (
    <div className=" md:w-11/12 mx-auto min-h-screen bg-gradient-to-br  dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/10">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 py-2 bg-clip-text text-transparent mb-2">
                Project Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and track all your projects in one place
              </p>
            </div>
            <Button 
              size="lg"
               variant="outline" 
              onClick={handleCreateProject}
              className="gap-2 bg-gradient-to-r  cursor-pointer shadow-lg"
            >
              <Plus className="w-5 h-5" />
              New Project
            </Button>
          </div>

          {/* Stats */}
          {projects.length > 0 && <DashboardStats projects={projects} />}

          {/* Filters */}
          {projects.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search projects by name, description, or key..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <DashboardEmptyState onCreateClick={handleCreateProject} />
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                No Projects Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No projects match your current filters. Try adjusting your search or filters.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'flex flex-col gap-4'
          }>
            {filteredProjects?.map((project) => (
              <ProjectCard
                key={project.projectId}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        )}

        {/* Create Project Modal */}
        <CreateProjectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreated={fetchProjects}
        />
      </div>
    </div>
  );
};

export default Dashboard;