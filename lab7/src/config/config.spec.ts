import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService('./src/config/.env');
  });

  describe('getData', () => {
    it('should return all fields of config', () => {
      const data = { vote_count: 395,
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
        release_date: '2018-08-02' };

      expect(configService.getData()[0]).toEqual(data);
    });
  });
});
