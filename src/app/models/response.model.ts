export interface Response {
  id?: string;
  url: string;
  name: string;
  publisher: string;
  country: string;
  released: Date;
  mediaType: string;
  numberOfPages: number;
  authors: string[];
  // aliases: string[];
}