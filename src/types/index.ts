export interface ServiceItem {
  id: number;
  name: string;
  url?: string;
  slug?: string;
  position?: number;
  icon_path?: string;
  image_path?: string;
  cover_image?: string;
  description?: string;
}

export interface FeaturedWorkItem {
  id: number;
  name?: string;
  title?: string;
  category?: string;
  image?: string;
  image_path?: string;
  link?: string;
  position?: number;
  description?: string;
}

export interface FilmPosterItem {
  id: number;
  film_name?: string;
  title?: string;
  category?: string;
  image?: string;
  main_image?: string;
  year?: string | number;
  year_of_release?: string | number;
  language?: string;
  genre?: string;
  imdb_rating?: string;
  trailer_link?: string;
  wikipedia_link?: string;
  imdb_link?: string;
  behance_link?: string;
  director?: string;
  production?: string;
  cast?: string;
  description?: string;
  images?: any[];
}

export interface EmployeePhotoItem {
  id: number;
  name: string;
  designation: string;
  photo?: string;
  image?: string;
  position_number?: number;
  position?: number;
}

export interface VisionImageItem {
  id: number;
  title?: string;
  image: string;
}


export interface ClientItem {
  id: number;
  name: string;
  logo_path?: string;
  logo?: string;
}
