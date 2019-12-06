import React from "react";
import {
  IoMdThumbsUp,
  IoMdTrophy,
  IoMdImages,
  IoMdContacts
} from "react-icons/io";

import { FaDesktop, FaCrown } from "react-icons/fa";

export const AnimeSpecifications = ({anime}) => {


  return (
    <div className="mosaic-info">
      <div className="episodes">
        Episódios <FaDesktop size={20} color="#9b59b6" />
        <span>{anime.episodes}</span>
      </div>
      <div className="rank">
        Rank <FaCrown size={20} color="#ffb229" />
        <span>{anime.rank}°</span>
      </div>
      <div className="popularity">
        Popularidade <IoMdTrophy size={20} color="#ffb229" />
        <span> {anime.popularity}° </span>
      </div>
      <div className="likes">
        Likes <IoMdThumbsUp size={20} color="#3498db" />
        <span> {anime.favorites} </span>
      </div>
      <div className="genre">
        Genero <IoMdImages size={20} color="#1abc9c" />
        <span> {anime.genres[0].name} </span>
      </div>
      <div className="genre">
        Membros <IoMdContacts size={20} color="#34495e" />
        <span> {anime.members} </span>
      </div>
    </div>
  );
};
