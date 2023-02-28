import { client } from './axiosClient';

export const getAllProducts = () => client.get<[]>('/');
// export const getAllCategories = () => client.get<[]>('/categories');
// export const getCategory = (category: string) => client.get<[]>(`/categories/${category}`);
