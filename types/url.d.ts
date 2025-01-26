export interface Url {
  id: string;
  title: string;
  originalUrl: string;
  shortUrl: string;
  countClick: number;
  createdAt: Date;
  active: boolean;
  expirationDate: Date;
}

export interface UrlData extends Url {
  shortCode: string;
  user_id: string | null;
  updatedAt: Date;
  anonymous_id: string | null;
}

export interface UrlStore {
  urls: Url[];
  nonAuthUrls: Url[];
  searchTerm: string;
  selectedUrl: Url | null;
  shortUrl: Url | null;
  error: string | null;
  loading: boolean;
  isLoaded: boolean;

  setSearchTerm: (term: string) => void;
  createShortUrl: (
    title: string,
    originalUrl: string,
    customDomain?: string
  ) => Promise<{ success: boolean; message?: string }>;
  getUrlsByUserEmail: () => Promise<void>;
  fetchAnonymousUrls: () => Promise<void>;
  filteredUrls: () => Url[];
  updateStatusUrl: (
    id: string,
    active: boolean
  ) => Promise<{ success: boolean; message?: string }>;
}

export interface ModalStore {
  modals: { [key: string]: boolean };
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  isOpen: (modalId: string) => boolean;
}
