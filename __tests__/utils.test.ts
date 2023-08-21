const {formatComments} = require ('../db/seeds/utils.ts')

interface LandTemple {
    land_id: number;
    landname: string;
    city: string;
    country: string;
    postcode: string;
    description: string;
    created_at: Date;
    vote: number;
    safety_rating: number;
    suitability_rating: number;
    cost: string;
    is_public: boolean;
    has_rink: boolean;
    suitabile_for: string;
    land_img_url: string;
    username: string;
}
interface CommentTemple {
    body: string;
    landname: string;
    username: string;
    created_at: Date;
}

type resultCommentTemple = {
    body: string;
    land_id: number;
    username: string;
    created_at: Date;
}


describe("formatComments", ()=>{
    test("if the function takes expty array should return empty array",()=>{
        const comments : CommentTemple[] = [];
        const lands : LandTemple[] = [{
            land_id: 1,
            landname: 'Media City Salford Quays',
            city: 'Salford',
            country: 'England',
            postcode: 'M50 2NT',
            description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
            created_at: new Date("2023-08-10T12:00:00Z"),
            vote: 8,
            safety_rating: 4,
            suitability_rating: 5,
            cost: "Free",
            is_public: true,
            has_rink: false,
            suitabile_for: "Skateboarding , Roller skating ",
            land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
            username: 'tickle122'
        },
        {
            land_id: 2,
            landname: 'Heaton Park',
            city: 'Manchester',
            country: 'England',
            postcode: 'M25 2SW',
            description: 'Urban park with a championship golf course for grown-ups, farm animals and play areas for kids.',
            created_at: new Date("2023-08-10T12:00:00Z"),
            vote: 8,
            safety_rating: 4,
            suitability_rating: 5,
            cost: "Free",
            is_public: true,
            has_rink: false,
            suitabile_for: "Roller skating",
            land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
            username: 'cooljmessy'
        }];
        expect(formatComments(comments, lands)).toEqual([])
    })

    test("if the function takes expty array should return empty array",()=>{
        const comments : CommentTemple[] = [];
        const lands : LandTemple[] = [];
        expect(formatComments(comments, lands)).toEqual([])
    })

    test("the function should return a new comments array which landname is replaced with land_id",()=>{
        const comments : CommentTemple[] = [{
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
          },
          {
            body: "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
            username: "grumpy19",
            landname: 'Media City Salford Quays',
            created_at: new Date("2023-08-10T12:00:00Z")
          }];
        const lands : LandTemple[] = [{
            land_id: 1,
            landname: 'Media City Salford Quays',
            city: 'Salford',
            country: 'England',
            postcode: 'M50 2NT',
            description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
            created_at: new Date("2023-08-10T12:00:00Z"),
            vote: 8,
            safety_rating: 4,
            suitability_rating: 5,
            cost: "Free",
            is_public: true,
            has_rink: false,
            suitabile_for: "Skateboarding , Roller skating ",
            land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
            username: 'tickle122'
        },
        {
            land_id: 2,
            landname: 'Heaton Park',
            city: 'Manchester',
            country: 'England',
            postcode: 'M25 2SW',
            description: 'Urban park with a championship golf course for grown-ups, farm animals and play areas for kids.',
            created_at: new Date("2023-08-10T12:00:00Z"),
            vote: 8,
            safety_rating: 4,
            suitability_rating: 5,
            cost: "Free",
            is_public: true,
            has_rink: false,
            suitabile_for: "Roller skating",
            land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
            username: 'cooljmessy'
        }];
        const result : resultCommentTemple[] =[{
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
          },
          {
            body: "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
            username: "grumpy19",
            land_id: 1,
            created_at: new Date("2023-08-10T12:00:00Z")
          }]
        expect(formatComments(comments, lands)).toEqual(result);
    })
})