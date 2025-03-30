import { useDelete, useGet, usePatch, usePost } from "@/hooks/useApi";
import { Event } from "@/types/Event";

export const useGetEventsQuery = () => useGet<Event[]>("events", "/api/events");

export const useCreateEventMutation = () =>
  usePost("/api/events", { invalidateKeys: ["events"] });

export const useUpdateEventMutation = (id: number) =>
  usePatch(`/api/events/${id}`, { invalidateKeys: ["events"] });

export const useDeleteEventMutation = (id: number) =>
  useDelete(`/api/events/${id}`, { invalidateKeys: ["events"] });
