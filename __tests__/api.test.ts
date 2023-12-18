const request = require("supertest")
const app = require('../app')
const connection = require('../db/connection')
const seed = require('../db/seeds/seed')
const devData = require('../db/data/test-data/index')


beforeEach(() => seed(devData.salesData, devData.ptsreviewData, devData.personaltrainerData, devData.businessesreviewData, devData.businessesData, devData.landData, devData.commentData, devData.userData))
afterAll(() => connection.end())

//-------------------------Tyoes---------------------------------
import { Response } from 'supertest';

interface ErrorResponse {
body: {msg:string};
}

//**** usersType
interface UsersSample {
    username: string;
    name: string;
    email: string;
    password: string;
    avatar_url: string;
    location: string;
}

interface UsersResponseBody {
    users: UsersSample[];
  }


//**** landsType
interface LandSample {
  land_id: number;
  landname: string;
  city: string;
  country: string;
  postcode: string;
  description: string;
  created_at: Date;
  vote: number;
  safety_rating_total: number;
  safety_rating_count: number;
  safety_rating_ave: number;
  suitability_rating_total: number;
  suitability_rating_count: number;
  suitability_rating_ave: number;
  cost: string;
  is_public: boolean;
  has_rink: boolean;
  suitabile_for: string;
  land_img_url: string;
  username: string;
}

interface LandsResponseBody {
    lands: LandSample[];
  }
interface SingleLandsResponseBody {
    land: LandSample;
  }
interface AddedLandsResponseBody {
    addedLand: LandSample;
  }

//**** commentsType
interface CommentSample{
  comment_id: number;
  body: string;
  land_id: number;
  username: string;
  created_at: Date;
}

interface CommentResponseBody {
  comments: CommentSample[];
}

interface AddedCommentResponseBody {
  addedComment: CommentSample;
}

//**** businessType
interface BusinessSample {
  business_id: number;
  username: string;
  businessname: string;
  city: string;
  country: string;
  postcode: string;
  description: string;
  created_at: Date;
  website: string;
  business_img_url: string;
}

interface BusinessResponseBody{
  businesses: BusinessSample[];
}

interface SingleBusinessResposeBody{
  business: BusinessSample;
}

//**** businessesReviewsType
interface BusinessesReviewsSample{
  review_id: number;
  username: string;
  business_id: number;
  body : string;
  rating: number;
  created_at: Date;
}
interface BusinessesReviewsResponseBody{
  businessesReviews: BusinessesReviewsSample[];
}

//**** personalTrainersType
interface PtSample{
  pt_id: number; 
  username: string; 
  ptname: string;
  city: string;
  country: string;
  postcode: string;
  description: string;
  created_at: Date;
  website: string;
  email: string;
  instagram: string;
  facebook: string;
  contact_number : string;
  avatar_url: string;
}

  //------------------------------------GET------------------------------------
describe("GET WRONG END-POINT",()=>{
    test("GET - status: 404 - not exist", ()=>{
        return request(app)
        .get("/wrongEndPoint")
        .expect(404)
        .then((response : ErrorResponse)=>{
            expect(response.body.msg).toBe("Not Found!")
        })
    })
    test("GET - status: 404 - not exist", ()=>{
      return request(app)
      .get("/api/nonsence")
      .expect(404)
      .then((response : ErrorResponse)=>{
          expect(response.body.msg).toBe("Not Found!")
      })
    })
})

describe(' GET /api/getEndpoints', () => {
  test("GET - status: 200 - respond with all the properties", () => {
    return request(app)
      .get("/api/getEndpoints")
      .expect(200)
      .then((response: Response) => { 
        expect(typeof response.body).toBe('object');
      });
  });
})

describe("GET /api/users",()=>{
    
    test("GET - status: 200 - respond with all the properties",()=>{
        return request(app)
        .get("/api/users")
        .expect(200)
        .then((response : Response)=>{
            const responseBody: UsersResponseBody = response.body;
            const users: UsersSample[] = responseBody.users;
            const expectedResult = [
              {
                username: 'tickle122',
                name: "John Doe",
                email: "john@example.com",
                password: "hashed_password",
                avatar_url: "data:image/jpeg;base64,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",
                location: "New York, NY"
              },
              {
                username: 'grumpy19',
                name: "Jane Smith",
                email: "jane@example.com",
                password: "hashed_password",
                avatar_url: "data:image/jpeg;base64,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",
                location: "Los Angeles, CA"
              },
              {
                username: 'cooljmessy',
                name: "Alex Johnson",
                email: "alex@example.com",
                password: "hashed_password",
                avatar_url: "data:image/jpeg;base64,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",
                location: "Chicago, IL"
              },
              {
                  username: 'happyamy2016',
                  name: "David Pit",
                  email: "david@example.com",
                  password: "hashed_password",
                  avatar_url: "data:image/jpeg;base64,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",
                  location: "Manchester, Ingland"
                },
                {
                  username: 'weegembump',
                  name: "Tom Hederson",
                  email: "tom@example.com",
                  password: "hashed_password",
                  avatar_url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHEBUSERESEA4QEg4VEhASExMYGBYRFREWFhURExMbKCggGBolGxcTITEiJSkrLi4xFx8zODMsNygtLi0BCgoKDQ0ODg8QDysZFRkrLTcrKysrKysrNysrKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOwA1QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAECB//EADcQAQABAQUFBQgBAwUBAAAAAAABAgMEBRExEyFBUWESMnGR0RQiUoGhscHhcmKy8EJDgpKiM//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/ZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ3ACtvWL02e6iO3PPh+1ZbX+0tta5iOVO6PouDSVVRTrMR4vmLamf9VPnDKTvDE1rtRk6LSbPuzNM9JmHdd8Wrs+9lXHXdPmYavhz3S+0XruzlVxpnX9uhFAAAAAAAAAAAAAAAAAAfNpXFnEzM5RGsqC/4hN63Rus+XPrV6PvFr5t6uzHcpnzq5q9UAFQAAAB7TPZnON0xpMLvDcR2/uV9/hPxftRmiK1w48MvntVO/v069Y4VOxFAAAAAAAAAAAAAAHJil49ns5y71W6PnrPk61Jjtp2q4p4U05/OZ9IgFYA0yAAAAAAAAnuNv7NXFXDSr+M6+vyadkWlw202tlTPGIyn5bkqx0gIoAAAAAAAAAAAAzmKz2rar/jHlTDRs5isZW1fjT9aYWJXIAqAAAAAAAAC9wKrOznpXP9sKJe4FGVnPWuf7aUqxYgIoAAAAAAAAAAAAo8ds+zXFXCqn6x+pheOPFbvt7Ocu9T70fmPL7AzoDTIAAAAAAAA0mGWeysqY4zGfnOf2yUNzsPaa4p4Tr/ABjVqNEqwARQAAAAAAAAAAAAAGfxS5+zVZx3KtOk/C4WstbOLamaaozidWev1xquk86J0q/E8pVHIAqAAAAARvXWGYbs8q6497/TTy6z1RU2FXP2anOrv1a9I4Q7gRQAAAAAAAAAAAAAAEV4vNF2jOqcuUcZ8IBKVRFUZTGcTrEqe1xqc/dojL+rX6aLC5XuL3TnG6Y3THKfQHHesHirfZz2Z+GdPlPBWW10rsO9TMRz1jzhp3q6mMgNXXY01600z4xEviLpZx/t0f8AWDTGYpjtbo3zyh2XfDLS21jsRzq9NWgppijSIiOkZPTTHLc7hRdd8e9V8U/iODqFZfsV2FXZoiKpjWZ0z5QirMVt2xem03Vx2J56x+llTMVRnG+J4wAAAAAAAAAAAAAEzlrujmosSxGbf3aN1HGfi/QOm/Yr2Pds988a+EeHNT11zXOczMzOsy+RUE9zvM3WrtRvjjHOEAqNXYW1NvTFVM5xP+ZS+2Xu15qu050zlzjhPjC4u2LUWne9yfOPNMVYD5s7Sm07sxV4TEvtFeCG1vdnY96unwzznyhWXvF5q3Wcdn+qdflHAHVid/i7R2af/pP/AJjnPVQPZnPXfPN4qDoul8rus+7O7jTOk+jnFRprnfKb3G7dVGtM6x6w6GTormzmJicpjSYX+HX+L1GU7rSOHPrCK7QEUAAAAAABXYxfNjHYp71Ub55U+sg5MVv+2nsUz7kazzn0VoKgAqAAAABO8AAAAAAAHtFU0TExOUxpLwBo8OvkXunfurjvR+Y6OtlbvbTd6oqp1j6xxiWnsLWLemKo0n/MkafYCAAAACO8W0WFM1TpEefKGYtbSbaqap1mc5WWOXjtTFEaRvq8Z0jy+6qWJQBUAAAAAAAAAAAAAAAAFjg162VXYnu16dKv3p5K4jcitcILjePaaIq46VfyjX1+adFAAHlpXFnEzOkRMz4Q9cGNWuzs8uNcxHyjfP48wUdraTa1TVOtUzM/N8A0yAAAAAAAAAAAAAAAAAAAAs8Dt+zVNHCqM48Y/X2XbKWFpsaoq+GYlq4nPwSrABFFHjtp2q4p+Gn6zPpELxm8Tr7drX0nLyjL8LErlAVAAAAAAAAAAAAAAAAAAAABpcMtNpZUzyjLynL0ZpeYDXnRVHKr7xHolWLIBFespeJ7VdU86qvvLVwys0dqZ8Z+6xKiE2yjqbKOqohE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIVvgE9+P4flXTZR1WGBRlVX4U/dFXACK//Z",
                  location: "Manchester, Ingland"
                },
                {
                  username: 'jessjelly',
                  name: "Alissia Hoolk",
                  email: "Alissia@example.com",
                  password: "hashed_password",
                  avatar_url: "data:image/jpeg;base64,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",
                  location: "Liverpool, Ingland"
                }
            ];
          
            expect(users).toEqual(expectedResult);
  
        })
    })
})

describe("GET /api/users/?username",()=>{
    test("GET - status: 404 - not exist", ()=>{
      return request(app)
      .get("/api/users/?username=username500")
      .expect(404)
      .then((response : ErrorResponse)=>{
          expect(response.body.msg).toBe("Not Found!")
      })
    })
    test("GET - status: 200 - respond with a specific land's info",()=>{
      return request(app)
      .get("/api/users/?username=weegembump")
      .expect(200)
      .then((response : Response)=>{
        const responseBody: UsersResponseBody = response.body;
        const user: UsersSample = responseBody.users[0];
          const expectedResult ={
                                  username: 'weegembump',
                                  name: "Tom Hederson",
                                  email: "tom@example.com",
                                  password: "hashed_password",
                                  avatar_url: "data:image/jpeg;base64,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",
                                  location: "Manchester, Ingland"
                                }
            
          expect(user).toEqual(expectedResult);
  
      })
    })
})

describe("GET /api/lands",()=>{
    test("GET - status: 200 - respond with all the lands",()=>{
        return request(app)
        .get("/api/lands")
        .expect(200)
        .then((response : Response)=>{
            const responseBody: LandsResponseBody = response.body;
            const lands: LandSample[] = responseBody.lands;
            const expectedResult = [
              {
                land_id: 1,
                landname: 'Media City Salford Quays',
                city: 'Salford',
                country: 'England',
                postcode: 'M50 2NT',
                description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
                created_at: '2023-08-10T11:00:00.000Z',
                vote: 8,
                safety_rating_total: 15,
                safety_rating_count: 4,
                safety_rating_ave: '3.75',
                suitability_rating_total: 25,
                suitability_rating_count: 5,
                suitability_rating_ave: '5.00',
                cost: 'Free',
                is_public: true,
                has_rink: false,
                suitabile_for: 'Skateboarding , Roller skating ',
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
                created_at: '2023-08-10T11:00:00.000Z',
                vote: 8,
                safety_rating_total: 15,
                safety_rating_count: 6,
                safety_rating_ave: '2.50',
                suitability_rating_total: 25,
                suitability_rating_count: 5,
                suitability_rating_ave: '5.00',
                cost: 'Free',
                is_public: true,
                has_rink: false,
                suitabile_for: 'Roller skating',
                land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
                username: 'cooljmessy'
              },
              {
                land_id: 3,
                landname: 'Seymour skatepark',
                city: 'Manchester',
                country: 'England',
                postcode: 'M16 0UB',
                description: "Got to be one of the best skate parks I've ever been to, great atmosphere, a bit small but every inch of space is used great for all skill levels, my only complaint is that there isnt anything too unusual there",
                created_at: '2023-08-10T11:00:00.000Z',
                vote: 5,
                safety_rating_total: 20,
                safety_rating_count: 4,
                safety_rating_ave: '5.00',
                suitability_rating_total: 30,
                suitability_rating_count: 6,
                suitability_rating_ave: '5.00',
                cost: 'Free',
                is_public: true,
                has_rink: true,
                suitabile_for: 'Skateboarding , Roller skating ',
                land_img_url: 'https://goo.gl/maps/xCoDTQdv6ddvUzLh6',
                username: 'grumpy19'
              },
              {
                land_id: 4,
                landname: 'Delamere Skate park',
                city: 'Manchester',
                country: 'England',
                postcode: 'M11 1JY',
                description: "This is a nice park, safe for children and it's relatively clean and tidy. The surrounding area is safe too. Lots of benches for relaxing too!",
                created_at: '2023-08-10T11:00:00.000Z',
                vote: 2,
                safety_rating_total: 7,
                safety_rating_count: 2,
                safety_rating_ave: '3.50',
                suitability_rating_total: 25,
                suitability_rating_count: 6,
                suitability_rating_ave: '4.17',
                cost: 'Free',
                is_public: true,
                has_rink: true,
                suitabile_for: 'Skateboarding',
                land_img_url: 'https://goo.gl/maps/HRFQ8LWEGEVxXyD38',
                username: 'weegembump'
              },
              {
                land_id: 5,
                landname: 'Brookdale Skate Park',
                city: 'Manchester',
                country: 'England',
                postcode: 'M40 1GJ',
                description: 'Good park with roll over , mini ramp ,some good smaller vert ramps , on one of the ramps the coping is loose and coming off could definitely do with a few repairs but good little park',
                created_at: '2023-08-10T11:00:00.000Z',
                vote: 0,
                safety_rating_total: 32,
                safety_rating_count: 8,
                safety_rating_ave: '4.00',
                suitability_rating_total: 25,
                suitability_rating_count: 6,
                suitability_rating_ave: '4.17',
                cost: 'Free',
                is_public: true,
                has_rink: true,
                suitabile_for: 'Skateboarding',
                land_img_url: 'https://goo.gl/maps/SdUzVby5PqoKo4YV7',
                username: 'jessjelly'
              }
            ]
            
            expect(lands).toEqual(expectedResult);

        })
    })
})

describe("GET Filtered Lands",()=>{
  test("GET - status: 200 - respond with all the lands filtered by city",()=>{
      return request(app)
      .get("/api/lands/?city=Salford")
      .expect(200)
      .then((response : Response)=>{
          const responseBody: LandsResponseBody = response.body;
          const lands: LandSample[] = responseBody.lands;
          const expectedResult = [
            {
              land_id: 1,
              landname: 'Media City Salford Quays',
              city: 'Salford',
              country: 'England',
              postcode: 'M50 2NT',
              description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
              created_at: '2023-08-10T11:00:00.000Z',
              vote: 8,
              safety_rating_total: 15,
              safety_rating_count: 4,
              safety_rating_ave: '3.75',
              suitability_rating_total: 25,
              suitability_rating_count: 5,
              suitability_rating_ave: '5.00',
              cost: 'Free',
              is_public: true,
              has_rink: false,
              suitabile_for: 'Skateboarding , Roller skating ',
              land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
              username: 'tickle122'
            }
            ]
          expect(lands).toEqual(expectedResult);
      })
  })

  test("GET - status: 200 - respond with all the lands filtered by has_rink",()=>{
    return request(app)
    .get("/api/lands/?has_rink=false")
    .expect(200)
    .then((response : Response)=>{
        const responseBody: LandsResponseBody = response.body;
        const lands: LandSample[] = responseBody.lands;
        const expectedResult = [
          {
            land_id: 1,
            landname: 'Media City Salford Quays',
            city: 'Salford',
            country: 'England',
            postcode: 'M50 2NT',
            description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
            created_at: '2023-08-10T11:00:00.000Z',
            vote: 8,
            safety_rating_total: 15,
            safety_rating_count: 4,
            safety_rating_ave: '3.75',
            suitability_rating_total: 25,
            suitability_rating_count: 5,
            suitability_rating_ave: '5.00',
            cost: 'Free',
            is_public: true,
            has_rink: false,
            suitabile_for: 'Skateboarding , Roller skating ',
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
            created_at: '2023-08-10T11:00:00.000Z',
            vote: 8,
            safety_rating_total: 15,
            safety_rating_count: 6,
            safety_rating_ave: '2.50',
            suitability_rating_total: 25,
            suitability_rating_count: 5,
            suitability_rating_ave: '5.00',
            cost: 'Free',
            is_public: true,
            has_rink: false,
            suitabile_for: 'Roller skating',
            land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
            username: 'cooljmessy'
          }
          ]
        expect(lands).toEqual(expectedResult);
    })
})

test("GET - status: 200 - respond with all the lands filtered by has_rink",()=>{
  return request(app)
  .get("/api/lands/?cost=Free")
  .expect(200)
  .then((response : Response)=>{
      const responseBody: LandsResponseBody = response.body;
      const lands: LandSample[] = responseBody.lands;
      const expectedResult = [
        {
          land_id: 1,
          landname: 'Media City Salford Quays',
          city: 'Salford',
          country: 'England',
          postcode: 'M50 2NT',
          description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 8,
          safety_rating_total: 15,
          safety_rating_count: 4,
          safety_rating_ave: '3.75',
          suitability_rating_total: 25,
          suitability_rating_count: 5,
          suitability_rating_ave: '5.00',
          cost: 'Free',
          is_public: true,
          has_rink: false,
          suitabile_for: 'Skateboarding , Roller skating ',
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
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 8,
          safety_rating_total: 15,
          safety_rating_count: 6,
          safety_rating_ave: '2.50',
          suitability_rating_total: 25,
          suitability_rating_count: 5,
          suitability_rating_ave: '5.00',
          cost: 'Free',
          is_public: true,
          has_rink: false,
          suitabile_for: 'Roller skating',
          land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
          username: 'cooljmessy'
        },
        {
          land_id: 3,
          landname: 'Seymour skatepark',
          city: 'Manchester',
          country: 'England',
          postcode: 'M16 0UB',
          description: "Got to be one of the best skate parks I've ever been to, great atmosphere, a bit small but every inch of space is used great for all skill levels, my only complaint is that there isnt anything too unusual there",
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 5,
          safety_rating_total: 20,
          safety_rating_count: 4,
          safety_rating_ave: '5.00',
          suitability_rating_total: 30,
          suitability_rating_count: 6,
          suitability_rating_ave: '5.00',
          cost: 'Free',
          is_public: true,
          has_rink: true,
          suitabile_for: 'Skateboarding , Roller skating ',
          land_img_url: 'https://goo.gl/maps/xCoDTQdv6ddvUzLh6',
          username: 'grumpy19'
        },
        {
          land_id: 4,
          landname: 'Delamere Skate park',
          city: 'Manchester',
          country: 'England',
          postcode: 'M11 1JY',
          description: "This is a nice park, safe for children and it's relatively clean and tidy. The surrounding area is safe too. Lots of benches for relaxing too!",
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 2,
          safety_rating_total: 7,
          safety_rating_count: 2,
          safety_rating_ave: '3.50',
          suitability_rating_total: 25,
          suitability_rating_count: 6,
          suitability_rating_ave: '4.17',
          cost: 'Free',
          is_public: true,
          has_rink: true,
          suitabile_for: 'Skateboarding',
          land_img_url: 'https://goo.gl/maps/HRFQ8LWEGEVxXyD38',
          username: 'weegembump'
        },
        {
          land_id: 5,
          landname: 'Brookdale Skate Park',
          city: 'Manchester',
          country: 'England',
          postcode: 'M40 1GJ',
          description: 'Good park with roll over , mini ramp ,some good smaller vert ramps , on one of the ramps the coping is loose and coming off could definitely do with a few repairs but good little park',
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 0,
          safety_rating_total: 32,
          safety_rating_count: 8,
          safety_rating_ave: '4.00',
          suitability_rating_total: 25,
          suitability_rating_count: 6,
          suitability_rating_ave: '4.17',
          cost: 'Free',
          is_public: true,
          has_rink: true,
          suitabile_for: 'Skateboarding',
          land_img_url: 'https://goo.gl/maps/SdUzVby5PqoKo4YV7',
          username: 'jessjelly'
        }
    ]
      expect(lands).toEqual(expectedResult);
  })
})

test("GET - status: 200 - respond with all the lands filtered by has_rink",()=>{
  return request(app)
  .get("/api/lands/?city=Manchester&has_rink=true")
  .expect(200)
  .then((response : Response)=>{
      const responseBody: LandsResponseBody = response.body;
      const lands: LandSample[] = responseBody.lands;
      const expectedResult = [
        {
          land_id: 3,
          landname: 'Seymour skatepark',
          city: 'Manchester',
          country: 'England',
          postcode: 'M16 0UB',
          description: "Got to be one of the best skate parks I've ever been to, great atmosphere, a bit small but every inch of space is used great for all skill levels, my only complaint is that there isnt anything too unusual there",
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 5,
          safety_rating_total: 20,
          safety_rating_count: 4,
          safety_rating_ave: '5.00',
          suitability_rating_total: 30,
          suitability_rating_count: 6,
          suitability_rating_ave: '5.00',
          cost: 'Free',
          is_public: true,
          has_rink: true,
          suitabile_for: 'Skateboarding , Roller skating ',
          land_img_url: 'https://goo.gl/maps/xCoDTQdv6ddvUzLh6',
          username: 'grumpy19'
        },
        {
          land_id: 4,
          landname: 'Delamere Skate park',
          city: 'Manchester',
          country: 'England',
          postcode: 'M11 1JY',
          description: "This is a nice park, safe for children and it's relatively clean and tidy. The surrounding area is safe too. Lots of benches for relaxing too!",
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 2,
          safety_rating_total: 7,
          safety_rating_count: 2,
          safety_rating_ave: '3.50',
          suitability_rating_total: 25,
          suitability_rating_count: 6,
          suitability_rating_ave: '4.17',
          cost: 'Free',
          is_public: true,
          has_rink: true,
          suitabile_for: 'Skateboarding',
          land_img_url: 'https://goo.gl/maps/HRFQ8LWEGEVxXyD38',
          username: 'weegembump'
        },
        {
          land_id: 5,
          landname: 'Brookdale Skate Park',
          city: 'Manchester',
          country: 'England',
          postcode: 'M40 1GJ',
          description: 'Good park with roll over , mini ramp ,some good smaller vert ramps , on one of the ramps the coping is loose and coming off could definitely do with a few repairs but good little park',
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 0,
          safety_rating_total: 32,
          safety_rating_count: 8,
          safety_rating_ave: '4.00',
          suitability_rating_total: 25,
          suitability_rating_count: 6,
          suitability_rating_ave: '4.17',
          cost: 'Free',
          is_public: true,
          has_rink: true,
          suitabile_for: 'Skateboarding',
          land_img_url: 'https://goo.gl/maps/SdUzVby5PqoKo4YV7',
          username: 'jessjelly'
        }
      ]
      expect(lands).toEqual(expectedResult);
  })
})

test("GET - status: 200 - respond with all the lands filtered by has_rink",()=>{
  return request(app)
  .get("/api/lands/?city=Manchester&has_rink=false&cost=Free")
  .expect(200)
  .then((response : Response)=>{
      const responseBody: LandsResponseBody = response.body;
      const lands: LandSample[] = responseBody.lands;
      const expectedResult = [
        {
          land_id: 2,
          landname: 'Heaton Park',
          city: 'Manchester',
          country: 'England',
          postcode: 'M25 2SW',
          description: 'Urban park with a championship golf course for grown-ups, farm animals and play areas for kids.',
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 8,
          safety_rating_total: 15,
          safety_rating_count: 6,
          safety_rating_ave: '2.50',
          suitability_rating_total: 25,
          suitability_rating_count: 5,
          suitability_rating_ave: '5.00',
          cost: 'Free',
          is_public: true,
          has_rink: false,
          suitabile_for: 'Roller skating',
          land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
          username: 'cooljmessy'
        }
    ]
      expect(lands).toEqual(expectedResult);
  })
})

test("GET - status: 404 - respond with Not Found!",()=>{
  return request(app)
  .get("/api/lands/?city=London&has_rink=false&cost=Free")
  .expect(404)
  .then(({body} : ErrorResponse)=>{
      expect(body.msg).toBe("Not Found!");
  })
})
})

describe("GET sorted lands",()=>{
  test("GET - status: 200 - check is result is sorted",()=>{
      return request(app)
      .get("/api/lands/?sort_by=landname&order_by=DESC")
      .expect(200)
      .then((response : Response)=>{
        const expectedResult = [
          {
            land_id: 3,
            landname: 'Seymour skatepark',
            city: 'Manchester',
            country: 'England',
            postcode: 'M16 0UB',
            description: "Got to be one of the best skate parks I've ever been to, great atmosphere, a bit small but every inch of space is used great for all skill levels, my only complaint is that there isnt anything too unusual there",
            created_at: '2023-08-10T11:00:00.000Z',
            vote: 5,
            safety_rating_total: 20,
            safety_rating_count: 4,
            safety_rating_ave: '5.00',
            suitability_rating_total: 30,
            suitability_rating_count: 6,
            suitability_rating_ave: '5.00',
            cost: 'Free',
            is_public: true,
            has_rink: true,
            suitabile_for: 'Skateboarding , Roller skating ',
            land_img_url: 'https://goo.gl/maps/xCoDTQdv6ddvUzLh6',
            username: 'grumpy19'
          },
          {
            land_id: 1,
            landname: 'Media City Salford Quays',
            city: 'Salford',
            country: 'England',
            postcode: 'M50 2NT',
            description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
            created_at: '2023-08-10T11:00:00.000Z',
            vote: 8,
            safety_rating_total: 15,
            safety_rating_count: 4,
            safety_rating_ave: '3.75',
            suitability_rating_total: 25,
            suitability_rating_count: 5,
            suitability_rating_ave: '5.00',
            cost: 'Free',
            is_public: true,
            has_rink: false,
            suitabile_for: 'Skateboarding , Roller skating ',
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
            created_at: '2023-08-10T11:00:00.000Z',
            vote: 8,
            safety_rating_total: 15,
            safety_rating_count: 6,
            safety_rating_ave: '2.50',
            suitability_rating_total: 25,
            suitability_rating_count: 5,
            suitability_rating_ave: '5.00',
            cost: 'Free',
            is_public: true,
            has_rink: false,
            suitabile_for: 'Roller skating',
            land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
            username: 'cooljmessy'
          },
          {
            land_id: 4,
            landname: 'Delamere Skate park',
            city: 'Manchester',
            country: 'England',
            postcode: 'M11 1JY',
            description: "This is a nice park, safe for children and it's relatively clean and tidy. The surrounding area is safe too. Lots of benches for relaxing too!",
            created_at: '2023-08-10T11:00:00.000Z',
            vote: 2,
            safety_rating_total: 7,
            safety_rating_count: 2,
            safety_rating_ave: '3.50',
            suitability_rating_total: 25,
            suitability_rating_count: 6,
            suitability_rating_ave: '4.17',
            cost: 'Free',
            is_public: true,
            has_rink: true,
            suitabile_for: 'Skateboarding',
            land_img_url: 'https://goo.gl/maps/HRFQ8LWEGEVxXyD38',
            username: 'weegembump'
          },
          {
            land_id: 5,
            landname: 'Brookdale Skate Park',
            city: 'Manchester',
            country: 'England',
            postcode: 'M40 1GJ',
            description: 'Good park with roll over , mini ramp ,some good smaller vert ramps , on one of the ramps the coping is loose and coming off could definitely do with a few repairs but good little park',
            created_at: '2023-08-10T11:00:00.000Z',
            vote: 0,
            safety_rating_total: 32,
            safety_rating_count: 8,
            safety_rating_ave: '4.00',
            suitability_rating_total: 25,
            suitability_rating_count: 6,
            suitability_rating_ave: '4.17',
            cost: 'Free',
            is_public: true,
            has_rink: true,
            suitabile_for: 'Skateboarding',
            land_img_url: 'https://goo.gl/maps/SdUzVby5PqoKo4YV7',
            username: 'jessjelly'
          }
        ]
  
          const responseBody: LandsResponseBody = response.body;
          const lands: LandSample[] = responseBody.lands;
          expect(lands).toEqual(expectedResult);

      })
  })
})

describe("GET /api/lands/?sort_by&order_by",()=>{
  test("GET - status: 200 - check is result is sorted",()=>{
      return request(app)
      .get("/api/lands/?city=Salford&sort_by=landname&order_by=DESC")
      .expect(200)
      .then((response : Response)=>{
          const responseBody: LandsResponseBody = response.body;
          const lands: LandSample[] = responseBody.lands;
          const expectedResult = [
            {
              land_id: 1,
              landname: 'Media City Salford Quays',
              city: 'Salford',
              country: 'England',
              postcode: 'M50 2NT',
              description: 'popular place for skating on the weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
              created_at: '2023-08-10T11:00:00.000Z',
              vote: 8,
              safety_rating_total: 15,
              safety_rating_count: 4,
              safety_rating_ave: '3.75',
              suitability_rating_total: 25,
              suitability_rating_count: 5,
              suitability_rating_ave: '5.00',
              cost: 'Free',
              is_public: true,
              has_rink: false,
              suitabile_for: 'Skateboarding , Roller skating ',
              land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
              username: 'tickle122'
            }
            ]
          expect(lands).toEqual(expectedResult);

      })
  })
})

describe("GET /api/lands/:land_id",()=>{
  test("GET - status: 400 - when add NON integer id should recive error", ()=>{
    return request(app)
    .get("/api/lands/any_id")
    .expect(400)
    .then((response : ErrorResponse)=>{
        expect(response.body.msg).toBe("invalid input syntax or type!")
    })
  })
  test("GET - status: 404 - not exist", ()=>{
    return request(app)
    .get("/api/lands/500")
    .expect(404)
    .then((response : ErrorResponse)=>{
        expect(response.body.msg).toBe("Not Found!")
    })
  })
  test("GET - status: 200 - respond with a specific land's info",()=>{
    return request(app)
    .get("/api/lands/2")
    .expect(200)
    .then((response : Response)=>{
        const responseBody: SingleLandsResponseBody = response.body;
        const land: LandSample = responseBody.land;
        const expectedResult =
        {
          land_id: 2,
          landname: 'Heaton Park',
          city: 'Manchester',
          country: 'England',
          postcode: 'M25 2SW',
          description: 'Urban park with a championship golf course for grown-ups, farm animals and play areas for kids.',
          created_at: '2023-08-10T11:00:00.000Z',
          vote: 8,
          safety_rating_total: 15,
          safety_rating_count: 6,
          safety_rating_ave: '2.50',
          suitability_rating_total: 25,
          suitability_rating_count: 5,
          suitability_rating_ave: '5.00',
          cost: 'Free',
          is_public: true,
          has_rink: false,
          suitabile_for: 'Roller skating',
          land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
          username: 'cooljmessy'
        }
          
        expect(land).toEqual(expectedResult);

    })
  })
})

describe("GET /api/lands/:land_id/comments",()=>{
  test("GET - status: 400 - when add NON integer id should recive error", ()=>{
    return request(app)
    .get("/api/lands/any_id/comments")
    .expect(400)
    .then((response : ErrorResponse)=>{
        expect(response.body.msg).toBe("invalid input syntax or type!")
    })
  })
  test("GET - status: 404 - not exist", ()=>{
    return request(app)
    .get("/api/lands/500/comments")
    .expect(404)
    .then((response : ErrorResponse)=>{
        expect(response.body.msg).toBe("Not Found!")
    })
  })
  test("GET - status: 200 - respond with an array of specific land's comments",()=>{
    return request(app)
    .get("/api/lands/2/comments")
    .expect(200)
    .then((response : Response)=>{
        const responseBody: CommentResponseBody = response.body;
        const comments: CommentSample[] = responseBody.comments;
        const expectedResult =[
                                {
                                  comment_id: 2,
                                  body: "Great park! We visited in June. We saw the animals, grabbed a drink and an ice cream which I felt we're reasonably priced. We took a picnic. Went down to the lake, played ball on the field. Great place to spend an afternoon. Easy access via Metrolink from where we live",
                                  username: "grumpy19",
                                  land_id: 2,
                                  created_at: "2023-08-10T11:00:00.000Z"
                                }
                              ]
          
        expect(comments).toEqual(expectedResult);

    })
  })
})

describe("Get /api/businesses",()=>{
    
  test("GET - status: 200 - respond with an array of all the businesses",()=>{
      return request(app)
      .get("/api/businesses")
      .expect(200)
      .then((response : Response)=>{
          const responseBody: BusinessResponseBody = response.body;
          const businesses: BusinessSample[] = responseBody.businesses;
          const expectedResult = [
            {
                business_id: 1,
                businessname: 'Welcome Skate Store',
                city: 'Leeds',
                country: 'England',
                postcode: 'LS1 6LQ',
                description: `One of the most renowned skateboard stores in the UK, situated in the independent retail hub Thornton’s Arcade, owned and run by skateboarders. You will always find friendly and knowledgeable staff and a huge selection of skateboard hardware and accessories in stock as well as skate shoes and clothing from... Thrasher, Polar Skate co., Spitfire, Independent, Santa Cruz, Levis, Carhartt, Converse, Bronze 56k, Emerica, Nike SB, Don’t Mess With Yorkshire, DC, Adidas, Huf, Thrasher, Hélas, Dickies, Yardsale, Palace, The National, New Balance, Vans, Lakai, Dime MTL, F**king Awesome, and many many more...`,
                created_at: "2023-08-10T11:00:00.000Z",
                website: 'https://welcomeleeds.com',
                contact_number: '087897185',
                business_img_url: 'https://lh5.googleusercontent.com/p/AF1QipMklaYHqep6XvI34GVqzrXchhFNE4X5Xh3Xe9ha=w260-h175-n-k-no',
                username: 'tickle122'
            },
             {
                business_id:2,  
                businessname: 'NOTE skateboard shop',
                city: 'Manchester',
                country: 'England',
                postcode: 'M4 1LA',
                description: `NOTE skate shop is one of the UK's leading skate stores supplying a broad range of skateboard hardware, footwear and apparel from exclusive brands.`,
                created_at: "2023-08-10T11:00:00.000Z",
                website: 'https://www.noteshop.co.uk/',
                contact_number: '01618397077',
                business_img_url: 'https://lh5.googleusercontent.com/p/AF1QipMcnhm5_OfGWIb-D0FacZRNl4JOzncECVNuZ-m7=w86-h87-n-k-no',
                username: 'cooljmessy'
            },
            {
                business_id:3,
                businessname: 'NOTE skateboard shop',
                city: 'Manchester',
                country: 'England',
                postcode: 'M4 1LA',
                description: `NOTE skate shop is one of the UK's leading skate stores supplying a broad range of skateboard hardware, footwear and apparel from exclusive brands.`,
                created_at: "2023-08-10T11:00:00.000Z",
                website: 'https://www.noteshop.co.uk/',
                contact_number: '01618877',
                business_img_url: 'https://lh5.googleusercontent.com/p/AF1QipMklaYHqep6XvI34GVqzrXchhFNE4X5Xh3Xe9ha=w260-h175-n-k-no',
                username: 'grumpy19'
            }
        ];
        
          expect(businesses).toEqual(expectedResult);

      })
  })
})

describe("Get /api/businesses/:business_id",()=>{
  
  test("GET - status: 400 - when add NON integer id should recive error", ()=>{
    return request(app)
    .get("/api/businesses/any_id")
    .expect(400)
    .then((response : ErrorResponse)=>{
        expect(response.body.msg).toBe("invalid input syntax or type!")
    })
  })

  test("GET - status: 404 - not exist", ()=>{
    return request(app)
    .get("/api/businesses/5342200")
    .expect(404)
    .then((response : ErrorResponse)=>{
        expect(response.body.msg).toBe("Not Found!")
    })
  })
  
  test("GET - status: 200 - respond with a specific business info",()=>{
      return request(app)
      .get("/api/businesses/2")
      .expect(200)
      .then((response : Response)=>{
          const responseBody: SingleBusinessResposeBody = response.body;
          const business: BusinessSample = responseBody.business;
          const expectedResult = {
                business_id:2,  
                businessname: 'NOTE skateboard shop',
                city: 'Manchester',
                country: 'England',
                postcode: 'M4 1LA',
                description: `NOTE skate shop is one of the UK's leading skate stores supplying a broad range of skateboard hardware, footwear and apparel from exclusive brands.`,
                created_at: "2023-08-10T11:00:00.000Z",
                website: 'https://www.noteshop.co.uk/',
                contact_number: '01618397077',
                business_img_url: 'https://lh5.googleusercontent.com/p/AF1QipMcnhm5_OfGWIb-D0FacZRNl4JOzncECVNuZ-m7=w86-h87-n-k-no',
                username: 'cooljmessy'
            }
        
          expect(business).toEqual(expectedResult);

      })
  })
})

describe("GET /api/businesses/:business_id/businessesreviews",()=>{
  test("GET - status: 400 - when add NON integer id should recive error", ()=>{
    return request(app)
    .get("/api/businesses/any_id/businessesreviews")
    .expect(400)
    .then((response : ErrorResponse)=>{
        expect(response.body.msg).toBe("invalid input syntax or type!")
    })
  })
  test("GET - status: 404 - not exist", ()=>{
    return request(app)
    .get("/api/businesses/5868900/businessesreviews")
    .expect(404)
    .then((response : ErrorResponse)=>{
        expect(response.body.msg).toBe("Not Found!")
    })
  })
  test("GET - status: 200 - respond with an array of specific business's reviews",()=>{
    return request(app)
    .get("/api/businesses/2/businessesreviews")
    .expect(200)
    .then((response : Response)=>{
        const responseBody: BusinessesReviewsResponseBody = response.body;
        const businessesReviews: BusinessesReviewsSample[] = responseBody.businessesReviews;
        const expectedResult =[
          {
            "body": "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            "business_id": 2,
            "created_at": "2023-08-10T11:00:00.000Z",
            "rating": null,
            "review_id": 1,
            "username": "tickle122",
          },
          {
            "body": "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            "business_id": 2,
            "created_at": "2023-08-10T11:00:00.000Z",
            "rating": null,
            "review_id": 2,
            "username": "cooljmessy",
          },
          {
            "body": "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            "business_id": 2,
            "created_at": "2023-08-10T11:00:00.000Z",
            "rating": null,
            "review_id": 3,
            "username": "tickle122",
          }
         ]
        expect(businessesReviews).toEqual(expectedResult);

    })
  })
})

describe("Get /api/personaltrainers",()=>{
  test("GET - status: 200 - respond with an array of all the personaltrainers",()=>{
    return request(app)
    .get("/api/personaltrainers")
    .expect(200)
    .then((response : Response)=>{
      const personalTrainers: PtSample[] = response.body.personalTrainers;
      const expectedResult = [
        {
            pt_id: 1,
            username: 'tickle122',
            ptname: "John Doe",
            city: 'New York',
            country: 'USA',
            postcode:  "xxx xxx",
            description: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            created_at: '2023-08-10T11:00:00.000Z',
            website: "www.xxx.com",
            email: "john@example.com",
            instagram: "instauser",
            facebook: "faceuser",
            contact_number: "001111",
            avatar_url: "data:image/jpeg;base64,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"
        },
        {
            pt_id: 2,
            username: 'weegembump',
            ptname: "Tom Hederson",
            city: 'Manchester',
            country: 'Ingland',
            postcode:  "M1",
            description: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            created_at: "2023-08-10T11:00:00.000Z",
            website: "www.xxx.com",
            email: "tom@example.com",
            instagram: "instauser",
            facebook: "faceuser",
            contact_number: "004478111",
            avatar_url: "data:image/jpeg;base64,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"
        }
    ]

    expect(personalTrainers).toEqual(expectedResult);

    })
  })
})

describe("Get /api/personaltrainers/:pt_id",()=>{
  test("GET - status: 200 - respond with a personaltrainer information with spesefic id",()=>{
    return request(app)
    .get("/api/personaltrainers/2")
    .expect(200)
    .then((response : Response)=>{
      const pt: PtSample = response.body.pt;
      const expectedResult = 
        {
            pt_id: 2,
            username: 'weegembump',
            ptname: "Tom Hederson",
            city: 'Manchester',
            country: 'Ingland',
            postcode:  "M1",
            description: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            created_at: "2023-08-10T11:00:00.000Z",
            website: "www.xxx.com",
            email: "tom@example.com",
            instagram: "instauser",
            facebook: "faceuser",
            contact_number: "004478111",
            avatar_url: "data:image/jpeg;base64,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"
        }
    

    expect(pt).toEqual(expectedResult);

    })
  })
})

//------------------------------------POST------------------------------------

describe("POST /api/lands/:land_id/comments",()=>{
  test("POST- status: 203- responds with error because username does not exist",()=>{
    const newComment = {
                        "body": "this is my test_add_comment body",
                        "username": "username500"
                       }
  return request(app)
  .post('/api/lands/3/comments')
  .send(newComment)
  .expect(203)
  .then((response : ErrorResponse)=>{
    expect(response.body.msg).toBe("Non-Authoritative Information!")
    })
  })

  test("POST- status: 400- responds with error because not sending correct information",()=>{
    const newComment = {
                        "body": "this is my test_add_comment body"
                       }
  return request(app)
  .post('/api/lands/3/comments')
  .send(newComment)
  .expect(400)
  .then((response : ErrorResponse)=>{
    expect(response.body.msg).toBe("BAD REQUEST!")
    })
  })

  test("POST- status: 400- responds with error because not sending correct information",()=>{
    const newComment = {
                        "text": "this is my test_add_comment body",
                        "username": "username1"
                       }
  return request(app)
  .post('/api/lands/3/comments')
  .send(newComment)
  .expect(400)
  .then((response : ErrorResponse)=>{
    expect(response.body.msg).toBe("BAD REQUEST!")
    })
  })

  test("POST- status: 201- responds with the added comment",()=>{
    const newComment = {
                        "body": "this is my test_add_comment body",
                        "username": "happyamy2016"
                       }
  return request(app)
  .post('/api/lands/3/comments')
  .send(newComment)
  .expect(201)
  .then(( response : Response ) => {
    const responseBody: AddedCommentResponseBody = response.body;
        const comment: CommentSample = responseBody.addedComment;
        expect(comment.username).toBe("happyamy2016");
        expect(comment.body).toBe(newComment.body);
        expect(comment.land_id).toBe(3);
      })
  })
})

describe("POST /api/land",()=>{
  test("POST- status: 203- responds with error because username does not exist",()=>{
    const newLand = {
      landname: 'Forth land',
      city: 'Cityexample1',
      country: 'countryexample1',
      postcode: "M11 M11",
      description: 'test description',
      cost: 'free',
      is_public: true,
      has_rink: false,
      suitabile_for: 'Skateboarding',
      land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
      username: 'username500'
                    }
  return request(app)
  .post('/api/land')
  .send(newLand)
  .expect(203)
  .then((response : ErrorResponse)=>{
    expect(response.body.msg).toBe("Non-Authoritative Information!")
    })
  })

  test("POST- status: 400- responds with error because not sending correct information",()=>{
    const newLand = {                
      name: 'Forth land',
      city: 'Cityexample1',
      country: 'countryexample1',
      postcode: "M11 M11",
      description: 'test description',
      cost: 'free',
      is_public: true,
      has_rink: false,
      suitabile_for: 'Skateboarding',
      land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
      username: 'weegembump'
                    }
  return request(app)
  .post('/api/land')
  .send(newLand)
  .expect(400)
  .then((response : ErrorResponse)=>{
    expect(response.body.msg).toBe("BAD REQUEST!")
    })
  })

  test("POST- status: 203- responds with error because not sending correct information",()=>{
    const newLand = {
      landname: 'Forth land',
      description: 'test description',
      land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
      username: 'username500'
    }
  return request(app)
  .post('/api/land')
  .send(newLand)
  .expect(400)
  .then((response : ErrorResponse)=>{
    expect(response.body.msg).toBe("BAD REQUEST!")
    })
  })

  test("POST- status: 201- responds with the added comment",()=>{
    const newLand = {
                      landname: 'Forth land',
                      city: 'Cityexample1',
                      country: 'countryexample1',
                      postcode: "M11 M11",
                      description: 'test description',
                      cost: 'free',
                      is_public: true,
                      has_rink: false,
                      suitabile_for: 'Skateboarding',
                      land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                      username: 'happyamy2016'
                    }
  return request(app)
  .post('/api/land')
  .send(newLand)
  .expect(201)
  .then(( response : Response ) => {
    const responseBody: AddedLandsResponseBody = response.body;
        const land: LandSample = responseBody.addedLand;
        expect(land.username).toBe("happyamy2016");
        expect(land.city).toBe(newLand.city);
        expect(land.country).toBe('countryexample1');
        expect(land.land_img_url).toBe(newLand.land_img_url);
        expect(land.landname).toBe(newLand.landname);

      })
  })
})

describe("PATCH /api/lands/:land_id", ()=>{
  test("PATCH- status: 202- responds with the updated land",()=>{
    const votesUpdate = { votes_update : 1 };
    return request(app)
    .patch('/api/lands/2')
    .send(votesUpdate)
    .expect(202)
    .then(({ body }: Response) => {
          expect(body.updatedLand.vote).toBe(9);
        })
  })

  test("PATCH- status: 202- responds with the updated land",()=>{
    const votesUpdate = { "votes_update" : -1 };
    return request(app)
    .patch('/api/lands/2')
    .send(votesUpdate)
    .expect(202)
    .then(({ body }: Response) => {
          expect(body.updatedLand.vote).toBe(7);
        })
  })

  test("PATCH- status: 202- responds with the updated land",()=>{
    const safety_ratingUpdate = { safety_rating_update : 4 };
    return request(app)
    .patch('/api/lands/2')
    .send(safety_ratingUpdate)
    .expect(202)
    .then(({ body }: Response) => {
          expect(body.updatedLand.safety_rating_total).toBe(19);
          expect(body.updatedLand.safety_rating_count).toBe(7);
        })
  })

  test("PATCH- status: 202- responds with the updated land",()=>{
    const suitability_ratingUpdate = { "suitability_rating_update" : 3 };
    return request(app)
    .patch('/api/lands/2')
    .send(suitability_ratingUpdate)
    .expect(202)
    .then(({ body }: Response) => {
          expect(body.updatedLand.suitability_rating_total).toBe(28);
          expect(body.updatedLand.suitability_rating_count).toBe(6);
        })
  })

})

describe("DELETE - /api/lands/:land_id", ()=>{
  test("DELETE - status: 204 , respond with no content",()=>{
    return request(app)
    .delete("/api/lands/2")
    .expect(204)
  })
})

describe("DELETE - /api/comments/:comment_id", ()=>{
  test("DELETE - status: 204 , respond with no content",()=>{
    return request(app)
    .delete("/api/comments/1")
    .expect(204)
  })
})