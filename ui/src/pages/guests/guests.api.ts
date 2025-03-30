import { useDelete, useGet, usePatch, usePost } from "@/hooks/useApi";
import { Guest } from "@/types/Guest";

export const useGetGuestsQuery = (eventId: number) =>
  useGet<Guest[]>("guests" + eventId, `/api/guests/${eventId}`);

export const useCreateGuestMutation = (eventId: number) =>
  usePost(`/api/guests/${eventId}`, { invalidateKeys: ["guests" + eventId] });

export const useUpdateGuestMutation = (id: number, eventId: number) =>
  usePatch(`/api/guests/${id}`, { invalidateKeys: ["guests" + eventId] });

export const useDeleteGuestMutation = (id: number, eventId: number) =>
  useDelete(`/api/guests/${id}`, { invalidateKeys: ["guests" + eventId] });
