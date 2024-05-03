import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { getArtworks } from "../services/artwork";
import ArtworkCard from "../components/ArtworkCard";
import style from "./index.module.css";
import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const pageSize = parseInt(url.searchParams.get("pageSize")) || 21;

  const artworks = await getArtworks(page, pageSize);
  return { artworks, page, pageSize };
};

const Index = () => {
  const {
    artworks: initialArtworks,
    page: initialPage,
    pageSize,
  } = useLoaderData();

  const [artworks, setArtworks] = useState(initialArtworks);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const navigate = useNavigate();

  const goToPage = async (page) => {
    const newArtworks = await getArtworks(page, pageSize);
    setArtworks(newArtworks);
    setCurrentPage(page);
    navigate(`?page=${page}&pageSize=${pageSize}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    goToPage(currentPage + 1);
  };

  return (
    <div className={style.paginationContainer}>
      <ul className={` ${style.list} `}>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <Link to={`/artwork/${artwork.id}`}>
              <div className={style.artwork}>
                <ArtworkCard
                  artworkId={artwork.id}
                  layers={artwork.attributes.layers}
                  globals={artwork.attributes.globals}
                  owner={artwork.owner.data.attributes}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={style.paginationButtons}>
        <button
          className={style.button}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <GrLinkPrevious />
        </button>
        <span>Page {currentPage}</span>
        <button
          className={style.button}
          onClick={handleNextPage}
          disabled={artworks.length < pageSize}
        >
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

Index.loader = loader;

export default Index;
