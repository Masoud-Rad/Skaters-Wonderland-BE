"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { formatComments } = require('../db/seeds/utils.ts');
describe("formatComments", () => {
    test("if the function takes expty array should return empty array", () => {
        const comments = [];
        const lands = [{
                land_id: 1,
                landname: 'Media City Salford Quays',
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
                landname: 'Heaton Park',
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
    test("if the function takes expty array should return empty array", () => {
        const comments = [];
        const lands = [];
        expect(formatComments(comments, lands)).toEqual([]);
    });
    test("the function should return a new comments array which landname is replaced with land_id", () => {
        const comments = [{
                body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
                username: "tickle122",
                landname: 'Media City Salford Quays',
                created_at: new Date("2023-08-10T12:00:00Z")
            },
            {
                body: "Great park! We visited in June. We saw the animals, grabbed a drink and an ice cream which I felt we're reasonably priced. We took a picnic. Went down to the lake, played ball on the field. Great place to spend an afternoon. Easy access via Metrolink from where we live",
                username: "grumpy19",
                landname: 'Heaton Park',
                created_at: new Date("2023-08-10T12:00:00Z")
            }];
        const lands = [{
                land_id: 1,
                landname: 'Media City Salford Quays',
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
                landname: 'Heaton Park',
                city: 'Manchester',
                country: 'England',
                description: 'Urban park with a championship golf course for grown-ups, farm animals and play areas for kids.',
                created_at: new Date("2023-08-10T12:00:00Z"),
                vote: 8,
                land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                username: 'cooljmessy'
            }];
        const result = [{
                body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
                username: "tickle122",
                land_id: 1,
                created_at: new Date("2023-08-10T12:00:00Z")
            },
            {
                body: "Great park! We visited in June. We saw the animals, grabbed a drink and an ice cream which I felt we're reasonably priced. We took a picnic. Went down to the lake, played ball on the field. Great place to spend an afternoon. Easy access via Metrolink from where we live",
                username: "grumpy19",
                land_id: 2,
                created_at: new Date("2023-08-10T12:00:00Z")
            }];
        expect(formatComments(comments, lands)).toEqual(result);
    });
});
//# sourceMappingURL=utils.test.js.map