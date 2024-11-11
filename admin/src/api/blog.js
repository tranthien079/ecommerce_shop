import { instance } from ".";

const baseURL = "blog";

export const getBlogs = async () => {
  const response = await instance.get(`${baseURL}/`);
  return response;
};

export const createBlogApi = async (data) => {
  const response = await instance.post(`${baseURL}/create`, data);
  return response;
};

export const updateBlogApi = async ({ id, data }) => {
  const response = await instance.put(`${baseURL}/${id}`, data);
  return response;
};

export const getBlogByIdApi = async (id) => {
  const response = await instance.get(`${baseURL}/${id}`);
  return response;
};

export const deleteBlogApi = async (id) => {
  const response = await instance.delete(`${baseURL}/${id}`);
  return response;
};
