import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

const apiBaseUrl = "http://localhost:8080";

function parseDateOnly<T>(obj: T): T {
  if (typeof obj === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj)) {
    return new Date(obj + "T00:00:00") as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map(parseDateOnly) as unknown as T;
  }
  if (typeof obj === "object" && obj !== null) {
    const parsedObj: any = { ...obj };
    for (const key in parsedObj) {
      parsedObj[key] = parseDateOnly(parsedObj[key]);
    }
    return parsedObj as T;
  }
  return obj;
}

async function fetchData<TResponse>(
  url: string,
  options?: RequestInit
): Promise<TResponse> {
  const token = localStorage.getItem("token");
  const authHeader: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const response = await fetch(apiBaseUrl + url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
      ...authHeader,
    },
    ...options,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

  const data = await response.json();
  return parseDateOnly(data) as TResponse;
}

export function useGet<TResponse>(
  key: string, // Unique key for caching
  url: string,
  options?: UseQueryOptions<TResponse>
): UseQueryResult<TResponse> {
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
