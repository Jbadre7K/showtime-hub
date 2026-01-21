import movie1 from "@/assets/movies/movie-1.jpg";
import movie2 from "@/assets/movies/movie-2.jpg";
import movie3 from "@/assets/movies/movie-3.jpg";
import movie4 from "@/assets/movies/movie-4.jpg";
import movie5 from "@/assets/movies/movie-5.jpg";
import movie6 from "@/assets/movies/movie-6.jpg";

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number; // in minutes
  director: string;
  synopsis: string;
  poster: string;
  releaseDate: string;
  rating: number;
  isNowShowing: boolean;
  isComingSoon: boolean;
}

export interface Showtime {
  id: string;
  movieId: string;
  roomId: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  type: "standard" | "vip" | "imax";
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "The Last Kingdom",
    genre: "Historique",
    duration: 148,
    director: "Christopher Nolan",
    synopsis: "Dans un royaume divisé par la guerre, un guerrier solitaire doit unir les clans pour affronter une menace venue du Nord. Une épopée grandiose mêlant batailles épiques et intrigues politiques.",
    poster: movie1,
    releaseDate: "2025-01-15",
    rating: 4.8,
    isNowShowing: true,
    isComingSoon: false,
  },
  {
    id: "2",
    title: "Neon Dreams",
    genre: "Science-Fiction",
    duration: 132,
    director: "Denis Villeneuve",
    synopsis: "Dans un futur cyberpunk, un hacker découvre une conspiration qui pourrait changer le destin de l'humanité. Entre réalité virtuelle et monde physique, les frontières s'effacent.",
    poster: movie2,
    releaseDate: "2025-01-22",
    rating: 4.6,
    isNowShowing: true,
    isComingSoon: false,
  },
  {
    id: "3",
    title: "Ocean's Whisper",
    genre: "Romance",
    duration: 118,
    director: "Greta Gerwig",
    synopsis: "Deux âmes perdues se rencontrent sur une plage isolée. Leur histoire d'amour transcende le temps et l'espace, portée par la mélodie éternelle des vagues.",
    poster: movie3,
    releaseDate: "2025-02-14",
    rating: 4.4,
    isNowShowing: true,
    isComingSoon: false,
  },
  {
    id: "4",
    title: "Shadow Protocol",
    genre: "Action",
    duration: 125,
    director: "Chad Stahelski",
    synopsis: "L'agent le plus redouté du MI6 doit affronter son passé lorsque d'anciens secrets refont surface. Explosions, poursuites et trahisons au programme.",
    poster: movie4,
    releaseDate: "2025-01-29",
    rating: 4.5,
    isNowShowing: true,
    isComingSoon: false,
  },
  {
    id: "5",
    title: "Enchanted Forest",
    genre: "Animation",
    duration: 95,
    director: "Hayao Miyazaki",
    synopsis: "Un jeune garçon découvre un monde magique caché dans la forêt. Accompagné de créatures fantastiques, il doit sauver cet univers de la destruction.",
    poster: movie5,
    releaseDate: "2025-02-05",
    rating: 4.9,
    isNowShowing: false,
    isComingSoon: true,
  },
  {
    id: "6",
    title: "Laughing Out Loud",
    genre: "Comédie",
    duration: 105,
    director: "Judd Apatow",
    synopsis: "Cinq amis d'enfance se retrouvent pour un week-end mémorable qui tourne au chaos. Fous rires garantis dans cette comédie délirante.",
    poster: movie6,
    releaseDate: "2025-02-20",
    rating: 4.2,
    isNowShowing: false,
    isComingSoon: true,
  },
];

export const rooms: Room[] = [
  { id: "1", name: "Salle 1 - Grand Écran", capacity: 200, type: "standard" },
  { id: "2", name: "Salle 2 - Premium", capacity: 120, type: "vip" },
  { id: "3", name: "Salle IMAX", capacity: 350, type: "imax" },
  { id: "4", name: "Salle 4 - Classique", capacity: 80, type: "standard" },
];

export const showtimes: Showtime[] = [
  { id: "s1", movieId: "1", roomId: "3", date: "2025-01-21", time: "14:00", price: 14.90, availableSeats: 280, totalSeats: 350 },
  { id: "s2", movieId: "1", roomId: "1", date: "2025-01-21", time: "17:30", price: 12.90, availableSeats: 150, totalSeats: 200 },
  { id: "s3", movieId: "1", roomId: "2", date: "2025-01-21", time: "20:00", price: 18.90, availableSeats: 45, totalSeats: 120 },
  { id: "s4", movieId: "2", roomId: "1", date: "2025-01-21", time: "15:00", price: 12.90, availableSeats: 180, totalSeats: 200 },
  { id: "s5", movieId: "2", roomId: "3", date: "2025-01-21", time: "19:00", price: 14.90, availableSeats: 320, totalSeats: 350 },
  { id: "s6", movieId: "2", roomId: "2", date: "2025-01-21", time: "21:30", price: 18.90, availableSeats: 88, totalSeats: 120 },
  { id: "s7", movieId: "3", roomId: "4", date: "2025-01-21", time: "16:00", price: 10.90, availableSeats: 65, totalSeats: 80 },
  { id: "s8", movieId: "3", roomId: "1", date: "2025-01-21", time: "20:30", price: 12.90, availableSeats: 120, totalSeats: 200 },
  { id: "s9", movieId: "4", roomId: "3", date: "2025-01-21", time: "18:00", price: 14.90, availableSeats: 290, totalSeats: 350 },
  { id: "s10", movieId: "4", roomId: "2", date: "2025-01-21", time: "21:00", price: 18.90, availableSeats: 100, totalSeats: 120 },
];

export const genres = [
  "Tous",
  "Action",
  "Animation",
  "Comédie",
  "Historique",
  "Romance",
  "Science-Fiction",
  "Thriller",
];

export function getMovieById(id: string): Movie | undefined {
  return movies.find((movie) => movie.id === id);
}

export function getShowtimesByMovieId(movieId: string): Showtime[] {
  return showtimes.filter((showtime) => showtime.movieId === movieId);
}

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}
