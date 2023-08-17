import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";

const apiKey = "f2fe78e55b19ab1c85e7ecc6aef649a4";
const url = "https://api.themoviedb.org/3/movie";
const nowplaying = "now_playing";
const popular = "popular";
const toprated = "toprated";
const upcomming = "upcoming";
const imgUrl = "https://image.tmdb.org/t/p/original/";

const Card = ({ img }) => {
  return <img className="card" src={img} alt="Card" />;
};

const Row = ({ title, arr }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [nowplayingmovies, setnowplayingmovies] = useState([]);
  const [topratedmovies, settopratedmovies] = useState([]);
  const [upcommingmovies, setupcommingmovies] = useState([]);
  const [popularmovies, setpopularmovies] = useState([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const { data: { results } } = await axios.get(`${url}/${nowplaying}?api_key=${apiKey}`);
        setnowplayingmovies(results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
        setnowplayingmovies([]); // Set an empty array as fallback
      }
    };

    const fetchUpcoming = async () => {
      try {
        const { data: { results } } = await axios.get(`${url}/${upcomming}?api_key=${apiKey}`);
        setupcommingmovies(results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        setupcommingmovies([]); // Set an empty array as fallback
      }
    };

    const fetchTopRated = async () => {
      try {
        const { data: { results } } = await axios.get(`${url}/${toprated}?api_key=${apiKey}`);
        settopratedmovies(results);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
        settopratedmovies([]); // Set an empty array as fallback
      }
    };

    const fetchPopular = async () => {
      try {
        const { data: { results } } = await axios.get(`${url}/${popular}?api_key=${apiKey}`);
        setpopularmovies(results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setpopularmovies([]); // Set an empty array as fallback
      }
    };

    fetchNowPlaying();
    fetchUpcoming();
    fetchTopRated();
    fetchPopular();
  }, []);

  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage:`url("https://filmyfool.com/wp-content/uploads/2019/04/avengersendgame-blogroll-2-1555518573008_1280w.jpg")`
      }}>
        
      </div>
      <Row title={"Popular"} arr={nowplayingmovies} />
      <Row title={"Movies"} arr={popularmovies} />
      <Row title={"TV shows"} arr={upcommingmovies} />
      <Row title={"My list"} arr={popularmovies} />
    </section>
  );
};

export default Home;
