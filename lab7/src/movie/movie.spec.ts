import { ConfigService } from '../config/config.service';
import { MovieService } from './movie.service';
import {BadRequestException} from '@nestjs/common';

describe('ConfigService', () => {
  let configService: ConfigService;
  let movieService: MovieService;

  beforeEach(() => {
    configService = new ConfigService('./src/config/.env');
    movieService = new MovieService(configService);
  });

  describe('getByName', () => {
    it('should return a movie includes this name', () => {
      const result = { vote_count: 6833,
        id: 181808,
        video: false,
        vote_average: 7.1,
        title: 'Star Wars: The Last Jedi',
        popularity: 53.453,
        poster_path: '/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
        original_language: 'en',
        original_title: 'Star Wars: The Last Jedi',
        genre_ids: [ 14, 12, 878, 28 ],
        backdrop_path: '/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg',
        adult: false,
        overview: 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
        release_date: '2017-12-13' };

      expect(movieService.getByName('wars')).toEqual(result);
    });
  });

  describe('getPage', () => {
    it('should return an array of movies', () => {
      const result = [ { vote_count: 395,
        id: 445651,
        video: false,
        vote_average: 6.8,
        title: 'The Darkest Minds',
        popularity: 75.509,
        poster_path: '/94RaS52zmsqaiAe1TG20pdbJCZr.jpg',
        original_language: 'en',
        original_title: 'The Darkest Minds',
        genre_ids: [ 878, 53 ],
        backdrop_path: '/5BxrMNGl3YDiWgHCVJu8iLQoJDM.jpg',
        adult: false,
        overview: 'After a disease kills 98% of America\'s children, the surviving 2% develop superpowers and are placed in internment camps. A 16-year-old girl escapes her camp and joins a group of other teens on the run from the government.',
        release_date: '2018-08-02' },
        { vote_count: 97,
          id: 463821,
          video: false,
          vote_average: 6.5,
          title: 'The House with a Clock in Its Walls',
          popularity: 66.993,
          poster_path: '/4MA86XWa0aYCwAu30qdvv3EyGBX.jpg',
          original_language: 'en',
          original_title: 'The House with a Clock in Its Walls',
          genre_ids: [ 27, 14, 53, 10751, 9648 ],
          backdrop_path: '/tQvvRReWhrXnj28s4AIp2PblByg.jpg',
          adult: false,
          overview: 'Ten-year-old Lewis goes to live with his uncle in a creaky old house that contains a mysterious ticktock noise. When Lewis accidentally awakens the dead, the town\'s sleepy facade magically springs to life with a secret world of witches and warlocks.',
          release_date: '2018-09-15' } ]


      expect(movieService.getPage(0, 2)).toEqual(result);
    });
  });

  describe('sort', () => {
    it('should return a sorted array by desc', () => {
      const result = { vote_count: 1,
        id: 143417,
        video: false,
        vote_average: 2,
        title: 'Blue Film: Estimation',
        popularity: 54.367,
        poster_path: '/4B8GnbdCklT2hkDzvMPoRjfbYNt.jpg',
        original_language: 'ja',
        original_title: '蒼いフィルム　品さだめ',
        genre_ids: [],
        backdrop_path: null,
        adult: false,
        overview: 'The film depicts the plight of a female office worker whose boss introduces to the world of pornographic films.',
        release_date: '1968-03-01' };

      expect(movieService.sort(movieService.getPage(0, 20), 'original_title', -1)[0]).toEqual(result);
    });

    it('should return an error because of wrong direction', () => {
      expect(() => movieService.sort(movieService.getPage(0, 20), 'adult', 3)).toThrow();
    });
  });

  describe('sort', () => {
    it('should return a sorted array by asc', () => {
      const result = { vote_count: 1,
        id: 143417,
        video: false,
        vote_average: 2,
        title: 'Blue Film: Estimation',
        popularity: 54.367,
        poster_path: '/4B8GnbdCklT2hkDzvMPoRjfbYNt.jpg',
        original_language: 'ja',
        original_title: '蒼いフィルム　品さだめ',
        genre_ids: [],
        backdrop_path: null,
        adult: false,
        overview: 'The film depicts the plight of a female office worker whose boss introduces to the world of pornographic films.',
        release_date: '1968-03-01' };

      expect(movieService.sort(movieService.getPage(0, 20), 'adult', 1)[0]).toEqual(result);
    });
  });

  describe('getById', () => {
    it('should return a record from array by id', () => {
      const result = { vote_count: 2407,
        id: 100,
        video: false,
        vote_average: 7.8,
        title: 'Lock, Stock and Two Smoking Barrels',
        popularity: 5.718,
        poster_path: '/qV7QaSf7f7yC2lc985zfyOJIAIN.jpg',
        original_language: 'en',
        original_title: 'Lock, Stock and Two Smoking Barrels',
        genre_ids: [ 35, 80 ],
        backdrop_path: '/kzeR7BA0htJ7BeI6QEUX3PVp39s.jpg',
        adult: false,
        overview: 'A card shark and his unwillingly-enlisted friends need to make a lot of cash quick after losing a sketchy poker match. To do this they decide to pull a heist on a small-time gang who happen to be operating out of the flat next door.',
        release_date: '1998-03-05' };

      expect(movieService.getById(100)).toEqual(result);
    });
  });
});
