const {formatComments} = require ('./db/seed/utils.ts')

interface LandTemple {
    land_id: number;
    landName: string;
    city: string;
    country: string;
    description: string;
    created_at: Date;
    vote: number;
    land_img_url: string;
    username: string;
}
interface CommentTemple {
    body: string;
    landName: string;
    username: string;
    created_at: Date;
}


describe("formatComments", ()=>{
    test("if the function takes expty array should return empty array",()=>{
        const comments : CommentTemple[] = [];
        const lands : LandTemple[] = [{
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
        expect(formatComments(comments, lands)).toEqual([])
    })
})