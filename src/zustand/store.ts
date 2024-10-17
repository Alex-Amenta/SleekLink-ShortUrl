import { delay } from "@/helpers/delay";
import axios from "axios";
import { getSession } from "next-auth/react";
import { create } from "zustand";
import { ModalStore, UrlStore } from "../../types/url";

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {},
  openModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    })),
  closeModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    })),
  toggleModal: (id) =>
    set((state) => ({
      modals: { ...state.modals, [id]: !state.modals[id] },
    })),
  isOpen: (modalId) => get().modals[modalId] || false,
}));

export const useUrlStore = create<UrlStore>((set, get) => ({
  urls: [],
  nonAuthUrls: [],
  searchTerm: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  selectedUrl: null,
  shortUrl: null,
  error: null,
  loading: false,
  isLoaded: false,

  createShortUrl: async (title, originalUrl, customDomain: string | null = null) => {
    set({ loading: true, error: null });

    try {
      const session = await getSession();
      const response = await axios.post(
        "/api/url",
        { title, originalUrl, customDomain },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      set((state) => {
        const newUrlData = {
          urls: response.data.user_id
            ? [response.data, ...state.urls]
            : state.urls,
          nonAuthUrls: response.data.user_id
            ? state.nonAuthUrls
            : [response.data, ...state.nonAuthUrls],
          shortUrl: response.data,
          loading: false,
        };
        return newUrlData;
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred";
      set({
        error: errorMessage,
        loading: false,
      });
      return { success: false, message: errorMessage };
    }
  },

  fetchUrls: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get("/api/url", { withCredentials: true });

      set({
        urls: response.data.result,
        loading: false,
      });
    } catch (error: unknown) {
      set({
        error: error.response
          ? error.response.data.message
          : "An error occurred",
        loading: false,
      });
    }
  },

  getUrlById: async (urlId) => {
    set({ loading: true, error: null });
    try {
      await delay(2000);

      const response = await axios.get(`/api/url/${urlId}`);

      set({
        selectedUrl: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "An error occurred",
        loading: false,
      });
    }
  },

  getUrlsByUserEmail: async () => {
    if (get().isLoaded) return;
    set({ loading: true, error: null });

    try {
      await delay(2000);

      const response = await axios.get("/api/url/user", {
        withCredentials: true,
      });

      set({
        urls: response.data,
        loading: false,
        isLoaded: true,
      });
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "An error occurred",
        loading: false,
      });
    }
  },

  fetchAnonymousUrls: async () => {
    set({ error: null });
    try {
      const response = await axios.get("/api/url/anonymous", {
        withCredentials: true,
      });

      set({
        nonAuthUrls: response.data,
      });
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error fetching Urls anonymous",
        loading: false,
      });
    }
  },

  filteredUrls: () => {
    const { urls, searchTerm } = useUrlStore.getState();
    return urls.filter((url) =>
      url.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  updateStatusUrl: async (id, active) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/url/${id}`, { active });

      if (response.status === 200) {
        set((state) => ({
          urls: state.urls.map((url) =>
            url.id === id ? { ...url, active } : url
          ),
          loading: false,
        }));
        return { success: true, message: response.data.message };
      } else {
        return { success: false, error: "Failed to delete URL" };
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      set({
        error: error.response
          ? error.response.data.message
          : "An error occurred while deleting the URL",
        loading: false,
      });
    }
  },
}));
