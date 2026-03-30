import { useState, useEffect } from 'react';
import apiClient from '../../api/api-client';
import { StatusDefinition, PriorityDefinition, EntityType } from '@multi-tenant/shared-types';

export const useMetadata = (type: EntityType) => {
  const [statuses, setStatuses] = useState<StatusDefinition[]>([]);
  const [priorities, setPriorities] = useState<PriorityDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      try {
        const [statusRes, priorityRes] = await Promise.all([
          apiClient.get(`/metadata/statuses?type=${type}`),
          apiClient.get(`/metadata/priorities?type=${type}`),
        ]);
        setStatuses(statusRes.data);
        setPriorities(priorityRes.data);
      } catch (err) {
        console.error('Failed to fetch metadata', err);
        setError('Failed to load metadata definitions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [type]);

  return { statuses, priorities, isLoading, error };
};
