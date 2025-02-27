import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

const apiBaseUrl = "http://localhost:8080";

async function fetchData<TResponse>(
  url: string,
  options?: RequestInit
): Promise<TResponse> {
  const response = await fetch(apiBaseUrl + url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

export function useGet<TResponse>(
  key: string, // Unique key for caching
  url: string,
  options?: UseQueryOptions<TResponse>
) {
  return useQuery<TResponse>({
    queryKey: [key],
    queryFn: () => fetchData<TResponse>(url),
    ...options,
  });
}

export function usePost<TRequest, TResponse>(
  url: string,
  options: UseMutationOptions<TResponse, unknown, TRequest> & {
    invalidateKeys?: string[];
  } = {}
) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: (payload) =>
      fetchData<TResponse>(url, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
      options.invalidateKeys?.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: options.onError,
  });
}

export function usePatch<TRequest, TResponse>(
  url: string,
  options: UseMutationOptions<TResponse, unknown, TRequest> & {
    invalidateKeys?: string[];
  } = {}
) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: (payload) =>
      fetchData<TResponse>(url, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
      options.invalidateKeys?.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: options.onError,
  });
}

export function useDelete<TResponse>(
  url: string,
  options: UseMutationOptions<TResponse, unknown, void> & {
    invalidateKeys?: string[];
  } = {}
) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, unknown, void>({
    mutationFn: () => fetchData<TResponse>(url, { method: "DELETE" }),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
      options.invalidateKeys?.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: options.onError,
  });
}
