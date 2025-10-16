export type MenuFormState = {
  status?: string;
  errors?: {
    id?: string[];
    name?: string[];
    descriptiom?: string[];
    price?: string[];
    discount?: string[];
    category?: string[];
    is_available?: string[];
    image_url?: string[];
    _form?: string[];
  };
};
