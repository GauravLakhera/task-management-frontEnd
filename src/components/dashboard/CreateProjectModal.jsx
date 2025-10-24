import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import api from '../../services/api';

const CreateProjectModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/project', formData);
      onCreated(); // callback to refresh project list
      onClose();
    } catch (error) {
      console.error('Create project failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Create New Project</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='name'>Project Name</Label>
            <Input
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='mt-2'
            />
          </div>
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='mt-2'
            />
          </div>
          <div className='flex gap-2'>
            <div>
              <Label htmlFor='startDate'>Start Date</Label>
              <Input
                id='startDate'
                name='startDate'
                type='date'
                value={formData.startDate}
                onChange={handleChange}
                className='mt-2'
              />
            </div>
            <div>
              <Label htmlFor='endDate'>End Date</Label>
              <Input
                id='endDate'
                name='endDate'
                type='date'
                value={formData.endDate}
                onChange={handleChange}
                className='mt-2'
              />
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='button' onClick={onClose} variant='outline'>
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
