'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import api from '@/services/api';
import apiKeys from '@/services/apiKeys';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from './selector';
import { getUsers } from '@/store/redux/slices/users';

const formSchema = z.object({
  memberId: z.string().nonempty('Please select a member')
});

export default function AddMembers({ isOpen, onClose, projectId }) {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const selector = userSelector();
  const { userList } = useSelector(selector);
  const [selectItems, setSelectItems] = useState([]);

  useEffect(() => {
    setSelectItems(userList);
  }, [userList]);

  useEffect(() => {
    if (isOpen) {
      dispatch(getUsers());
    }
  }, [isOpen]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: ''
    }
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const memberId = values?.memberId;
    try {
      apiKeys;
      await api.post(apiKeys.addMember, {
        projectId,
        members: [{ user: memberId }]
      });

      toast.success('Member added successfully!');
      onClose();
      form.reset();
    } catch (err) {
      toast.error('Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Add Members</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 mt-4'
          >
            <FormField
              control={form.control}
              name='memberId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Member</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={`w-full`}>
                        <SelectValue placeholder='Select a member' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectItems?.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant='outline'
                type='button'
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
