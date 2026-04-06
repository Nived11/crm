import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '@/utils/extractErrorMessages';

export function useStatusTracker() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch only "Marked as Called" clients
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['status-tracker', search, page],
    queryFn: async () => {
      let url = `/clients/list-create/?page=${page}&has_called=true`;
      if (search) url += `&search=${search}`;
      const response = await api.get(url);
      return response.data;
    },
  });

  // Update Status and Remarks (PATCH)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: any }) =>
      api.patch(`/clients/detail/${id}/`, formData),
    onSuccess: () => {
      toast.success('Status updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['status-tracker'] });
    },
    onError: (err) => toast.error(extractErrorMessages(err).description),
  });

  // Delete Client
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.delete(`/clients/detail/${id}/`),
    onSuccess: () => {
      toast.success('Lead deleted from tracker!');
      queryClient.invalidateQueries({ queryKey: ['status-tracker'] });
    },
    onError: (err) => toast.error(extractErrorMessages(err).description),
  });

  return {
    clients: data?.results || [],
    totalPages: Math.ceil((data?.count || 0) / pageSize) || 1,
    hasNext: !!data?.next,
    hasPrevious: !!data?.previous,
    page,
    setPage,
    loading: isLoading,
    isError,
    errorMessage: isError ? extractErrorMessages(error) : null,
    setSearch: (val: string) => { setSearch(val); setPage(1); },
    refetch,
    updateStatusMutation,
    deleteMutation,
  };
}