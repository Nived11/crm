import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '@/utils/extractErrorMessages';

export function useMessage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['messages', page],
    queryFn: async () => {
      const response = await api.get(`/contcts/admin/list/?page=${page}`);
      return response.data;
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const messages = data?.results || [];
  const totalCount = data?.count || 0;
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const detailMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.get(`/contacts/admin/Detail/${id}/`);
      return response.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['messages', page] });
      const previousData = queryClient.getQueryData<any>(['messages', page]);
      if (previousData) {
        queryClient.setQueryData(['messages', page], {
          ...previousData,
          results: previousData.results.map((m: any) =>
            m.id === id ? { ...m, is_read: true } : m
          ),
        });
      }
      return { previousData };
    },
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['messages', page], context.previousData);
      }
      const errorObj = extractErrorMessages(err);
      toast.error(errorObj.description);
    },
  });

  const replyMutation = useMutation({
    mutationFn: async ({ id, text }: { id: number; text: string }) => {
      return api.post(`/contacts/admin/${id}/reply/`, { reply_text: text });
    },
    onSuccess: () => {
      toast.success('Reply sent successfully!');
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (err) => {
      const errorObj = extractErrorMessages(err);
      toast.error(errorObj.description);
    },
  });

  return {
    messages,
    totalCount,
    loading: isLoading,
    isError,
    errorMessage: isError
      ? extractErrorMessages(error)
      : { title: '', description: '' },
    refetch,
    detailMutation,
    replyMutation,
    page,
    setPage,
    hasNext,
    hasPrevious,
    totalPages,
  };
}