export type Seller = { id: string; name: string; rating: number };

export type CatalogItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  unit: string;
  image: string;
  inStock: boolean;
  tags: string[];
  seller: Seller;
  details: { origin: string; shelfLifeDays: number | null };
};

export type Category = {
  id: string;
  name: string;
  description: string;
  items: CatalogItem[];
};

export type Catalog = {
  market: string;
  city: string;
  updatedAt: string;
  categories: Category[];
};