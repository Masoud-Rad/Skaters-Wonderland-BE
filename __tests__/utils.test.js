"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { formatComments } = require('./db/seed/utils.ts');
describe("formatComments", () => {
    test("if the function takes expty array should return empty array", () => {
        const comments = [];
        const lands = [{
                land_id: 1,
                landName: 'Media City Salford Quays',
                city: 'Salford',
                country: 'England',
                description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
                created_at: new Date("2023-08-10T12:00:00Z"),
                vote: 8,
                land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                username: 'cooljmessy'
            },
            {
                land_id: 2,
                landName: 'Heaton Park',
                city: 'Manchester',
                country: 'England',
                description: 'Urban park with a championship golf course for grown-ups, farm animals and play areas for kids.',
                created_at: new Date("2023-08-10T12:00:00Z"),
                vote: 8,
                land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                username: 'cooljmessy'
            }];
        expect(formatComments(comments, lands)).toEqual([]);
    });
});
//# sourceMappingURL=utils.test.js.map