import { delay } from "@/helpers/delay";
import axios from "axios";
import { create } from "zustand";
import { ModalStore, Url, UrlStore } from "$/types/url";
import {
  createShortUrl as postShortUrl,
  getUrlsByUserEmail,
  updateStatusUrl,
} from "@/actions/url";

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

  createShortUrl: async (
    title: string,
    originalUrl: string,
    customDomain: string | null = null
  ) => {
    set({ loading: true, error: null });

    try {
      const result = await postShortUrl({
        title,
        originalUrl,
        customDomain: customDomain || undefined,
      });

      if (result.success) {
        set((state) => {
          const newUrlData = {
            urls: result.data?.user_id
              ? [result.data, ...state.urls]
              : state.urls,
            nonAuthUrls: result.data?.user_id
              ? state.nonAuthUrls
              : result.data
              ? [result.data, ...state.nonAuthUrls]
              : state.nonAuthUrls,
            shortUrl: result.data,
            loading: false,
          };

          return newUrlData;
        });

        return { success: true };
      } else {
        set({
          error: result.message,
          loading: false,
        });
        return { success: false, message: result.message };
      }
    } catch (error: unknown) {
      console.error("Error al crear URL:", error);
      if (error instanceof Error) {
        set({
          error: error.message || "An error occurred",
          loading: false,
        });
      } else {
        set({
          error: "Unknown error occurred",
          loading: false,
        });
      }
      return { success: false, error: "Unknown error occurred" };
    }
  },

  getUrlsByUserEmail: async () => {
    if (get().isLoaded) return;
    set({ loading: true, error: null });

    try {
      await delay(2000);

      const data = await getUrlsByUserEmail();

      set({
        urls: data,
        loading: false,
        isLoaded: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({
          error: error.message || "An error occurred",
          loading: false,
        });
      } else {
        set({
          error: "Unknown error occurred",
          loading: false,
        });
      }
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
      // Aquí validamos que 'error' sea del tipo AxiosError
      if (axios.isAxiosError(error)) {
        set({
          error: error.response
            ? error.response.data.message
            : "Error fetching Urls anonymous",
          loading: false,
        });
      } else {
        // En caso de que no sea un error de Axios, podemos manejarlo de otra manera
        set({
          error: "Unknown error occurred",
          loading: false,
        });
      }
    }
  },

  filteredUrls: (): Url[] => {
    const { urls, searchTerm } = useUrlStore.getState();
    return urls.filter((url) =>
      url.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  updateStatusUrl: async (id, active) => {
    set({ loading: true, error: null });
    try {
      const response = await updateStatusUrl(id, active);

      if (response.success) {
        set((state) => ({
          urls: state.urls.map((url) =>
            url.id === id ? { ...url, active } : url
          ),
          loading: false,
        }));
        return { success: true, message: response.message };
      } else {
        return { success: false, error: "Failed to delete URL" };
      }
    } catch (error) {
      if (error instanceof Error) {
        set({
          error: error.message || "An error occurred",
          loading: false,
        });
        return { success: false, error: error.message || "An error occurred" }; // Devolvemos un objeto en todos los casos
      } else {
        set({
          error: "Unknown error occurred",
          loading: false,
        });
        return { success: false, error: "Unknown error occurred" }; // Devolvemos un objeto
      }
    }
  },
}));
