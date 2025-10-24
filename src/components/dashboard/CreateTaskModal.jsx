import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { memberSelector, stageSelector } from '../../pages/Projects/selector';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectMember, getProjectStages } from '@/store/redux/slices/project';

const CreateTaskModal = ({ isOpen, onClose, projectId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'task',
    priority: 'medium',
    stage: '',
    assignee: '',
    dueDate: ''  // Added dueDate
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const stageSel = stageSelector();
  const memberSel = memberSelector();

  const { stages } = useSelector(stageSel);
  const { member } = useSelector(memberSel);

  // Fetch project stages
  const fetchProject = () => dispatch(getProjectStages({ id: projectId }));
  // Fetch project members
  const fetchProjectMember = () => dispatch(getProjectMember({ id: projectId }));

  useEffect(() => {
    if (isOpen) {
      fetchProject();
      fetchProjectMember();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.stage || !formData.assignee) {
      toast.error('Please select a stage and a member');
      return;
    }

    setLoading(true);
    try {
      await api.post('/issue', { ...formData, projectId });
      toast.success('Task created successfully!');
      onClose();
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        stage: '',
        assignee: '',
        dueDate: ''
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4 mt-2'>
          {/* Title */}
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              placeholder='Enter task title'
            />
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter task description'
            />
          </div>

          {/* Priority */}
          <div className='space-y-2'>
            <Label htmlFor='priority'>Priority</Label>
            <select
              id='priority'
              name='priority'
              value={formData.priority}
              onChange={handleChange}
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            >
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>

          {/* Stage */}
          <div className='space-y-2'>
            <Label htmlFor='stage'>Stage</Label>
            <select
              id='stage'
              name='stage'
              value={formData.stage}
              onChange={handleChange}
              required
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            >
              <option value=''>Select Stage</option>
              {stages.map((stage) => (
                <option key={stage._id} value={stage._id} style={{ color: stage.color }}>
                  {stage.name}
                </option>
              ))}
            </select>
          </div>

          {/* Member */}
          <div className='space-y-2'>
            <Label htmlFor='assignee'>Assign To</Label>
            <select
              id='assignee'
              name='assignee'
              value={formData.assignee}
              onChange={handleChange}
              required
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            >
              <option value=''>Select Member</option>
              {member.map((m) => (
                <option
                  key={m._id}
                  value={m.user._id}
                  style={{ color: m.user.profileColor }}
                >
                  {m.user.firstName} {m.user.lastName || ''}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div className='space-y-2'>
            <Label htmlFor='dueDate'>Due Date</Label>
            <Input
              id='dueDate'
              name='dueDate'
              type='date'
              value={formData.dueDate}
              onChange={handleChange}
              required
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            />
          </div>

          <DialogFooter className='mt-4'>
            <Button
              variant='outline'
              type='button'
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
