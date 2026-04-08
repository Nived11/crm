import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '@/utils/extractErrorMessages';

export function useClients() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Fetch Clients
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['clients', search, page, categoryFilter],
    queryFn: async () => {
      let url = `/clients/list-create/?page=${page}`;
      if (search) url += `&search=${search}`;
      if (categoryFilter) url += `&category=${categoryFilter}`;
      const response = await api.get(url);
      return response.data;
    },
  });

  // Fetch Categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/clients/categories/');
      return response.data;
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (name: string) => api.post('/clients/categories/', { name }),
    onSuccess: () => {
      toast.success('Category added!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (err) => toast.error(extractErrorMessages(err).description),
  });

  const createMutation = useMutation({
    mutationFn: async (payload: any) => api.post('/clients/list-create/', payload),
    onSuccess: () => {
      toast.success('Client added successfully!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (err) => toast.error(extractErrorMessages(err).description),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: any }) =>
      api.patch(`/clients/detail/${id}/`, formData), // FIXED URL
    onSuccess: () => {
      toast.success('Client updated!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (err) => toast.error(extractErrorMessages(err).description),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.delete(`/clients/detail/${id}/`),
    onSuccess: () => {
      toast.success('Client deleted!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (err) => toast.error(extractErrorMessages(err).description),
  });

  return {
    clients: data?.results || [],
    categories,
    totalPages: Math.ceil((data?.count || 0) / pageSize) || 1,
    hasNext: !!data?.next,
    hasPrevious: !!data?.previous,
    page,
    setPage,
    loading: isLoading,
    isError,
    errorMessage: isError ? extractErrorMessages(error) : null,
    setSearch: (val: string) => { setSearch(val); setPage(1); },
    setCategoryFilter,
    refetch,
    createCategoryMutation,
    createMutation,
    updateMutation,
    deleteMutation
  };
}