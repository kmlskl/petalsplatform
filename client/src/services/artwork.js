import { fetchApi, unwrapAttributes } from "./strapi";
import { getToken } from "./auth";

const getArtworks = async (page = 1, pageSize = 21) => {
  const artworks = await fetchApi({
    endpoint: "artworks",
    query: {
      populate: ["owner"],
      pagination: {
        page,
        pageSize,
      },
    },
    wrappedByKey: "data",
  });

  if (!artworks) return [];
  return artworks.map(unwrapAttributes);
};

const getArtwork = async (id) => {
  const artwork = await fetchApi({
    endpoint: `artworks/${id}`,
    query: { populate: ["owner"] },
    wrappedByKey: "data",
  });
  return unwrapAttributes(artwork);
};

const createArtwork = async (data) => {
  const artwork = await fetchApi(
    {
      endpoint: "artworks",
      query: { populate: ["id"] },
    },
    {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return unwrapAttributes(artwork);
};

const updateArtwork = async (id, data) => {
  const artwork = await fetchApi(
    {
      endpoint: `artworks/${id}`,
    },
    {
      method: "PUT",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return unwrapAttributes(artwork);
};

const deleteArtwork = async (id) => {
  const artwork = await fetchApi(
    {
      endpoint: `artworks/${id}`,
    },
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return unwrapAttributes(artwork);
};

export { getArtworks, createArtwork, getArtwork, updateArtwork, deleteArtwork };
