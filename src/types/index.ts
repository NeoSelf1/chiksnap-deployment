export interface MoodImage {
  id: number;
  src: any;
  alt: string;
}

export interface Photographer {
  id: number;
  name: string;
  instagramId: string;
  profileImg: any;
  workImages: string[];
  services: string[];
  price: string;
}

export interface SnapType {
  id: string;
  title: string;
  description: string;
  image: any;
}
