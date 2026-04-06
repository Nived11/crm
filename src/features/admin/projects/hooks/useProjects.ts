import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '@/utils/extractErrorMessages';

export function useProjects() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 20;

    // 1. Fetch Projects List
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['projects', search, page],
        queryFn: async () => {
            const url = `/projects/admin/list/?page=${page}${search ? `&search=${search}` : ''}`;

            const response = await api.get(url);
            return response.data;
        },
    });

    // 2. Create Project
    const createMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return api.post('/projects/admin/create/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        },
        onSuccess: () => {
            toast.success('Project created successfully!');
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (err) => toast.error(extractErrorMessages(err).description),
    });

    // 3. Update Project
    const updateMutation = useMutation({
        mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
            return api.patch(`/projects/admin/detail/${id}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        },
        onSuccess: () => {
            toast.success('Project updated!');
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (err) => toast.error(extractErrorMessages(err).description),
    });
    // 4. Delete Project
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return api.delete(`/projects/admin/detail/${id}/`);
        },
        onSuccess: () => {
            toast.success('Project deleted!');
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (err) => toast.error(extractErrorMessages(err).description),
    });

    return {
        projects: data?.results || [],
        totalCount: data?.count || 0,
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
        createMutation,
        updateMutation,
        deleteMutation
    };
}