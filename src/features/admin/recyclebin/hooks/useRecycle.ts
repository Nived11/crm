import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '@/utils/extractErrorMessages';

export function useRecycle() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 20; 

    // 1. Fetch Recycle Bin Clients
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['recycleBin', search, page],
        queryFn: async () => {
            const url = `/clients/bin/?page=${page}${search ? `&search=${search}` : ''}`;
            const response = await api.get(url);
            return response.data;
        },
    });

    // 2. Restore Client Mutation
    const restoreMutation = useMutation({
        mutationFn: async (id: number) => {
            return api.patch(`/clients/bin/${id}/restore/`);
        },
        onSuccess: () => {
            toast.success('Client restored successfully!');
            queryClient.invalidateQueries({ queryKey: ['recycleBin'] });
            queryClient.invalidateQueries({ queryKey: ['clients'] }); 
        },
        onError: (err) => toast.error(extractErrorMessages(err).description),
    });

    const clientsData = Array.isArray(data) ? data : data?.results || [];
    const totalCount = Array.isArray(data) ? data.length : data?.count || 0;

    return {
        clients: clientsData,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize) || 1,
        hasNext: !Array.isArray(data) && !!data?.next,
        hasPrevious: !Array.isArray(data) && !!data?.previous,
        page,
        setPage,
        loading: isLoading,
        isError,
        errorMessage: isError ? extractErrorMessages(error) : null,
        setSearch: (val: string) => { setSearch(val); setPage(1); }, 
        refetch,
        restoreMutation
    };
}