const request = require("supertest")
const app = require('../app')
const connection = require('../db/connection')
const seed = require('../db/seeds/seed')
const devData = require('../db/data/test-data/index')


beforeEach(() => seed(devData.landData, devData.commentData, devData.userData))
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
    safety_rating: number;
    suitability_rating: number;
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
  //------------------------------------------------------------------------
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
                avatar_url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHEBUSERESEA4QEg4VEhASExMYGBYRFREWFhURExMbKCggGBolGxcTITEiJSkrLi4xFx8zODMsNygtLi0BCgoKDQ0ODg8QDysZFRkrLTcrKysrKysrNysrKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOwA1QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAECB//EADcQAQABAQUFBQgBAwUBAAAAAAABAgMEBRExEyFBUWESMnGR0RQiUoGhscHhcmKy8EJDgpKiM//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/ZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ3ACtvWL02e6iO3PPh+1ZbX+0tta5iOVO6PouDSVVRTrMR4vmLamf9VPnDKTvDE1rtRk6LSbPuzNM9JmHdd8Wrs+9lXHXdPmYavhz3S+0XruzlVxpnX9uhFAAAAAAAAAAAAAAAAAAfNpXFnEzM5RGsqC/4hN63Rus+XPrV6PvFr5t6uzHcpnzq5q9UAFQAAAB7TPZnON0xpMLvDcR2/uV9/hPxftRmiK1w48MvntVO/v069Y4VOxFAAAAAAAAAAAAAAHJil49ns5y71W6PnrPk61Jjtp2q4p4U05/OZ9IgFYA0yAAAAAAAAnuNv7NXFXDSr+M6+vyadkWlw202tlTPGIyn5bkqx0gIoAAAAAAAAAAAAzmKz2rar/jHlTDRs5isZW1fjT9aYWJXIAqAAAAAAAAC9wKrOznpXP9sKJe4FGVnPWuf7aUqxYgIoAAAAAAAAAAAAo8ds+zXFXCqn6x+pheOPFbvt7Ocu9T70fmPL7AzoDTIAAAAAAAA0mGWeysqY4zGfnOf2yUNzsPaa4p4Tr/ABjVqNEqwARQAAAAAAAAAAAAAGfxS5+zVZx3KtOk/C4WstbOLamaaozidWev1xquk86J0q/E8pVHIAqAAAAARvXWGYbs8q6497/TTy6z1RU2FXP2anOrv1a9I4Q7gRQAAAAAAAAAAAAAAEV4vNF2jOqcuUcZ8IBKVRFUZTGcTrEqe1xqc/dojL+rX6aLC5XuL3TnG6Y3THKfQHHesHirfZz2Z+GdPlPBWW10rsO9TMRz1jzhp3q6mMgNXXY01600z4xEviLpZx/t0f8AWDTGYpjtbo3zyh2XfDLS21jsRzq9NWgppijSIiOkZPTTHLc7hRdd8e9V8U/iODqFZfsV2FXZoiKpjWZ0z5QirMVt2xem03Vx2J56x+llTMVRnG+J4wAAAAAAAAAAAAAEzlrujmosSxGbf3aN1HGfi/QOm/Yr2Pds988a+EeHNT11zXOczMzOsy+RUE9zvM3WrtRvjjHOEAqNXYW1NvTFVM5xP+ZS+2Xu15qu050zlzjhPjC4u2LUWne9yfOPNMVYD5s7Sm07sxV4TEvtFeCG1vdnY96unwzznyhWXvF5q3Wcdn+qdflHAHVid/i7R2af/pP/AJjnPVQPZnPXfPN4qDoul8rus+7O7jTOk+jnFRprnfKb3G7dVGtM6x6w6GTormzmJicpjSYX+HX+L1GU7rSOHPrCK7QEUAAAAAABXYxfNjHYp71Ub55U+sg5MVv+2nsUz7kazzn0VoKgAqAAAABO8AAAAAAAHtFU0TExOUxpLwBo8OvkXunfurjvR+Y6OtlbvbTd6oqp1j6xxiWnsLWLemKo0n/MkafYCAAAACO8W0WFM1TpEefKGYtbSbaqap1mc5WWOXjtTFEaRvq8Z0jy+6qWJQBUAAAAAAAAAAAAAAAAFjg162VXYnu16dKv3p5K4jcitcILjePaaIq46VfyjX1+adFAAHlpXFnEzOkRMz4Q9cGNWuzs8uNcxHyjfP48wUdraTa1TVOtUzM/N8A0yAAAAAAAAAAAAAAAAAAAAs8Dt+zVNHCqM48Y/X2XbKWFpsaoq+GYlq4nPwSrABFFHjtp2q4p+Gn6zPpELxm8Tr7drX0nLyjL8LErlAVAAAAAAAAAAAAAAAAAAAABpcMtNpZUzyjLynL0ZpeYDXnRVHKr7xHolWLIBFespeJ7VdU86qvvLVwys0dqZ8Z+6xKiE2yjqbKOqohE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIVvgE9+P4flXTZR1WGBRlVX4U/dFXACK//Z",
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
                avatar_url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHEBUSERESEA4QEg4VEhASExMYGBYRFREWFhURExMbKCggGBolGxcTITEiJSkrLi4xFx8zODMsNygtLi0BCgoKDQ0ODg8QDysZFRkrLTcrKysrKysrNysrKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOwA1QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAECB//EADcQAQABAQUFBQgBAwUBAAAAAAABAgMEBRExEyFBUWESMnGR0RQiUoGhscHhcmKy8EJDgpKiM//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/ZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ3ACtvWL02e6iO3PPh+1ZbX+0tta5iOVO6PouDSVVRTrMR4vmLamf9VPnDKTvDE1rtRk6LSbPuzNM9JmHdd8Wrs+9lXHXdPmYavhz3S+0XruzlVxpnX9uhFAAAAAAAAAAAAAAAAAAfNpXFnEzM5RGsqC/4hN63Rus+XPrV6PvFr5t6uzHcpnzq5q9UAFQAAAB7TPZnON0xpMLvDcR2/uV9/hPxftRmiK1w48MvntVO/v069Y4VOxFAAAAAAAAAAAAAAHJil49ns5y71W6PnrPk61Jjtp2q4p4U05/OZ9IgFYA0yAAAAAAAAnuNv7NXFXDSr+M6+vyadkWlw202tlTPGIyn5bkqx0gIoAAAAAAAAAAAAzmKz2rar/jHlTDRs5isZW1fjT9aYWJXIAqAAAAAAAAC9wKrOznpXP9sKJe4FGVnPWuf7aUqxYgIoAAAAAAAAAAAAo8ds+zXFXCqn6x+pheOPFbvt7Ocu9T70fmPL7AzoDTIAAAAAAAA0mGWeysqY4zGfnOf2yUNzsPaa4p4Tr/ABjVqNEqwARQAAAAAAAAAAAAAGfxS5+zVZx3KtOk/C4WstbOLamaaozidWev1xquk86J0q/E8pVHIAqAAAAARvXWGYbs8q6497/TTy6z1RU2FXP2anOrv1a9I4Q7gRQAAAAAAAAAAAAAAEV4vNF2jOqcuUcZ8IBKVRFUZTGcTrEqe1xqc/dojL+rX6aLC5XuL3TnG6Y3THKfQHHesHirfZz2Z+GdPlPBWW10rsO9TMRz1jzhp3q6mMgNXXY01600z4xEviLpZx/t0f8AWDTGYpjtbo3zyh2XfDLS21jsRzq9NWgppijSIiOkZPTTHLc7hRdd8e9V8U/iODqFZfsV2FXZoiKpjWZ0z5QirMVt2xem03Vx2J56x+llTMVRnG+J4wAAAAAAAAAAAAAEzlrujmosSxGbf3aN1HGfi/QOm/Yr2Pds988a+EeHNT11zXOczMzOsy+RUE9zvM3WrtRvjjHOEAqNXYW1NvTFVM5xP+ZS+2Xu15qu050zlzjhPjC4u2LUWne9yfOPNMVYD5s7Sm07sxV4TEvtFeCG1vdnY96unwzznyhWXvF5q3Wcdn+qdflHAHVid/i7R2af/pP/AJjnPVQPZnPXfPN4qDoul8rus+7O7jTOk+jnFRprnfKb3G7dVGtM6x6w6GTormzmJicpjSYX+HX+L1GU7rSOHPrCK7QEUAAAAAABXYxfNjHYp71Ub55U+sg5MVv+2nsUz7kazzn0VoKgAqAAAABO8AAAAAAAHtFU0TExOUxpLwBo8OvkXunfurjvR+Y6OtlbvbTd6oqp1j6xxiWnsLWLemKo0n/MkafYCAAAACO8W0WFM1TpEefKGYtbSbaqap1mc5WWOXjtTFEaRvq8Z0jy+6qWJQBUAAAAAAAAAAAAAAAAFjg162VXYnu16dKv3p5K4jcitcILjePaaIq46VfyjX1+adFAAHlpXFnEzOkRMz4Q9cGNWuzs8uNcxHyjfP48wUdraTa1TVOtUzM/N8A0yAAAAAAAAAAAAAAAAAAAAs8Dt+zVNHCqM48Y/X2XbKWFpsaoq+GYlq4nPwSrABFFHjtp2q4p+Gn6zPpELxm8Tr7drX0nLyjL8LErlAVAAAAAAAAAAAAAAAAAAAABpcMtNpZUzyjLynL0ZpeYDXnRVHKr7xHolWLIBFespeJ7VdU86qvvLVwys0dqZ8Z+6xKiE2yjqbKOqohE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIRNso6myjqCETbKOpso6ghE2yjqbKOoIVvgE9+P4flXTZR1WGBRlVX4U/dFXACK//Z",
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
                  avatar_url: "data:image/jpeg;base64,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",
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
                  created_at: "2023-08-10T11:00:00.000Z",
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
                  created_at: "2023-08-10T11:00:00.000Z",
                  vote: 8,
                  safety_rating: 4,
                  suitability_rating: 5,
                  cost: "Free",
                  is_public: true,
                  has_rink: false,
                  suitabile_for: "Roller skating",
                  land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
                  username: 'cooljmessy'
              },
              {
                  land_id: 3,
                  landname: 'Seymour skatepark',
                  city: 'Manchester',
                  country: 'England',
                  postcode: 'M16 0UB',
                  description: `Got to be one of the best skate parks I've ever been to, great atmosphere, a bit small but every inch of space is used great for all skill levels, my only complaint is that there isnt anything too unusual there`,
                  created_at: "2023-08-10T11:00:00.000Z",
                  vote: 5,
                  safety_rating: 4,
                  suitability_rating: 5,
                  cost: "Free",
                  is_public: true,
                  has_rink: true,
                  suitabile_for: "Skateboarding , Roller skating ",
                  land_img_url: 'https://goo.gl/maps/xCoDTQdv6ddvUzLh6',
                  username: 'grumpy19'
              },
              {
                  land_id: 4,
                  landname: 'Delamere Skate park',
                  city: 'Manchester',
                  country: 'England',
                  postcode: 'M11 1JY',
                  description: `This is a nice park, safe for children and it's relatively clean and tidy. The surrounding area is safe too. Lots of benches for relaxing too!`,
                  created_at: "2023-08-10T11:00:00.000Z",
                  vote: 2,
                  safety_rating: 5,
                  suitability_rating: 1,
                  cost: "Free",
                  is_public: true,
                  has_rink: true,
                  suitabile_for: "Skateboarding",
                  land_img_url: 'https://goo.gl/maps/HRFQ8LWEGEVxXyD38',
                  username: 'weegembump'
              },
              {
                  land_id: 5,
                  landname: 'Brookdale Skate Park',
                  city: 'Manchester',
                  country: 'England',
                  postcode: 'M40 1GJ',
                  description: `Good park with roll over , mini ramp ,some good smaller vert ramps , on one of the ramps the coping is loose and coming off could definitely do with a few repairs but good little park`,
                  created_at: "2023-08-10T11:00:00.000Z",
                  vote: 0,
                  safety_rating: 4,
                  suitability_rating: 1,
                  cost: "Free",
                  is_public: true,
                  has_rink: true,
                  suitabile_for: "Skateboarding",
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
              created_at: "2023-08-10T11:00:00.000Z",
              vote: 8,
              safety_rating: 4,
              suitability_rating: 5,
              cost: "Free",
              is_public: true,
              has_rink: false,
              suitabile_for: "Skateboarding , Roller skating ",
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
            created_at: "2023-08-10T11:00:00.000Z",
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
            created_at: "2023-08-10T11:00:00.000Z",
            vote: 8,
            safety_rating: 4,
            suitability_rating: 5,
            cost: "Free",
            is_public: true,
            has_rink: false,
            suitabile_for: "Roller skating",
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
            created_at: "2023-08-10T11:00:00.000Z",
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
            created_at: "2023-08-10T11:00:00.000Z",
            vote: 8,
            safety_rating: 4,
            suitability_rating: 5,
            cost: "Free",
            is_public: true,
            has_rink: false,
            suitabile_for: "Roller skating",
            land_img_url: 'https://goo.gl/maps/HerU9jhe6H855wh76',
            username: 'cooljmessy'
        },
        {
            land_id: 3,
            landname: 'Seymour skatepark',
            city: 'Manchester',
            country: 'England',
            postcode: 'M16 0UB',
            description: `Got to be one of the best skate parks I've ever been to, great atmosphere, a bit small but every inch of space is used great for all skill levels, my only complaint is that there isnt anything too unusual there`,
            created_at: "2023-08-10T11:00:00.000Z",
            vote: 5,
            safety_rating: 4,
            suitability_rating: 5,
            cost: "Free",
            is_public: true,
            has_rink: true,
            suitabile_for: "Skateboarding , Roller skating ",
            land_img_url: 'https://goo.gl/maps/xCoDTQdv6ddvUzLh6',
            username: 'grumpy19'
        },
        {
            land_id: 4,
            landname: 'Delamere Skate park',
            city: 'Manchester',
            country: 'England',
            postcode: 'M11 1JY',
            description: `This is a nice park, safe for children and it's relatively clean and tidy. The surrounding area is safe too. Lots of benches for relaxing too!`,
            created_at: "2023-08-10T11:00:00.000Z",
            vote: 2,
            safety_rating: 5,
            suitability_rating: 1,
            cost: "Free",
            is_public: true,
            has_rink: true,
            suitabile_for: "Skateboarding",
            land_img_url: 'https://goo.gl/maps/HRFQ8LWEGEVxXyD38',
            username: 'weegembump'
        },
        {
            land_id: 5,
            landname: 'Brookdale Skate Park',
            city: 'Manchester',
            country: 'England',
            postcode: 'M40 1GJ',
            description: `Good park with roll over , mini ramp ,some good smaller vert ramps , on one of the ramps the coping is loose and coming off could definitely do with a few repairs but good little park`,
            created_at: "2023-08-10T11:00:00.000Z",
            vote: 0,
            safety_rating: 4,
            suitability_rating: 1,
            cost: "Free",
            is_public: true,
            has_rink: true,
            suitabile_for: "Skateboarding",
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
            description: `Got to be one of the best skate parks I've ever been to, great atmosphere, a bit small but every inch of space is used great for all skill levels, my only complaint is that there isnt anything too unusual there`,
            created_at: "2023-08-10T11:00:00.000Z",
            vote: 5,
            safety_rating: 4,
            suitability_rating: 5,
            cost: "Free",
            is_public: true,
            has_rink: true,
            suitabile_for: "Skateboarding , Roller skating ",
            land_img_url: 'https://goo.gl/maps/xCoDTQdv6ddvUzLh6',
            username: 'grumpy19'
        },
        {
            land_id: 4,
            landname: 'Delamere Skate park',
            city: 'Manchester',
            country: 'England',
            postcode: 'M11 1JY',
            description: `This is a nice park, safe for children and it's relatively clean and tidy. The surrounding area is safe too. Lots of benches for relaxing too!`,
            created_at: "2023-08-10T11:00:00.000Z",
            vote: 2,
            safety_rating: 5,
            suitability_rating: 1,
            cost: "Free",
            is_public: true,
            has_rink: true,
            suitabile_for: "Skateboarding",
            land_img_url: 'https://goo.gl/maps/HRFQ8LWEGEVxXyD38',
            username: 'weegembump'
        },
        {
            land_id: 5,
            landname: 'Brookdale Skate Park',
            city: 'Manchester',
            country: 'England',
            postcode: 'M40 1GJ',
            description: `Good park with roll over , mini ramp ,some good smaller vert ramps , on one of the ramps the coping is loose and coming off could definitely do with a few repairs but good little park`,
            created_at: "2023-08-10T11:00:00.000Z",
            vote: 0,
            safety_rating: 4,
            suitability_rating: 1,
            cost: "Free",
            is_public: true,
            has_rink: true,
            suitabile_for: "Skateboarding",
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
          created_at: "2023-08-10T11:00:00.000Z",
          vote: 8,
          safety_rating: 4,
          suitability_rating: 5,
          cost: "Free",
          is_public: true,
          has_rink: false,
          suitabile_for: "Roller skating",
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
          const responseBody: LandsResponseBody = response.body;
          const lands: LandSample[] = responseBody.lands;
          
          expect(lands).toBeSortedBy("title", { ascending: true, coerce: false});

      })
  })
})

describe.skip("GET /api/lands/?sort_by&order_by",()=>{
  test("GET - status: 200 - check is result is sorted",()=>{
      return request(app)
      .get("/api/lands/?city=Cityexample2&sort_by=landname&order_by=DESC")
      .expect(200)
      .then((response : Response)=>{
          const responseBody: LandsResponseBody = response.body;
          const lands: LandSample[] = responseBody.lands;
          const expectedResult = [
              {
                land_id: 2,
                landname: 'Second land',
                city: 'Cityexample2',
                country: 'countryexample2',
                description: 'Urban park with a championship golf course  for grown-ups, farm animals and play areas for kids.',
                vote: 8,
                created_at: '2023-08-10T11:00:00.000Z',
                land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                username: 'username2'
              }
            ]
          expect(lands).toEqual(expectedResult);

      })
  })
})

describe.skip("GET /api/lands/:land_id",()=>{
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
              landname: 'Second land',
              city: 'Cityexample2',
              country: 'countryexample2',
              description: 'Urban park with a championship golf course  for grown-ups, farm animals and play areas for kids.',
              vote: 8,
              created_at: '2023-08-10T11:00:00.000Z',
              land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
              username: 'username2'
            }
          
        expect(land).toEqual(expectedResult);

    })
  })
})

describe.skip("GET /api/lands/:land_id/comments",()=>{
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
  test("GET - status: 200 - respond with a specific land's info",()=>{
    return request(app)
    .get("/api/lands/2/comments")
    .expect(200)
    .then((response : Response)=>{
        const responseBody: CommentResponseBody = response.body;
        const comments: CommentSample[] = responseBody.comments;
        const expectedResult =[
                                {
                                  comment_id: 3,
                                  body: "kkQui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
                                  username: "username2",
                                  land_id: 2,
                                  created_at: "2023-08-10T11:00:00.000Z"
                                }
                              ]
          
        expect(comments).toEqual(expectedResult);

    })
  })
})

describe.skip("POST /api/lands/:land_id/comments",()=>{
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

  test("POST- status: 203- responds with error because not sending correct information",()=>{
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

  test("POST- status: 203- responds with error because not sending correct information",()=>{
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
                        "username": "username1"
                       }
  return request(app)
  .post('/api/lands/3/comments')
  .send(newComment)
  .expect(201)
  .then(( response : Response ) => {
    const responseBody: AddedCommentResponseBody = response.body;
        const comment: CommentSample = responseBody.addedComment;
        expect(comment.username).toBe("username1");
        expect(comment.body).toBe(newComment.body);
        expect(comment.land_id).toBe(3);
      })
  })
})

describe.skip("POST /api/land",()=>{
  test("POST- status: 203- responds with error because username does not exist",()=>{
    const newLand = {
                      landname: 'Forth land',
                      city: 'Cityexample1',
                      country: 'countryexample1',
                      description: 'test description',
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

  test("POST- status: 203- responds with error because not sending correct information",()=>{
    const newLand = {
                      name: 'Forth land',
                      city: 'Cityexample1',
                      country: 'countryexample1',
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
                      description: 'test description',
                      land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                      username: 'username1'
                    }
  return request(app)
  .post('/api/land')
  .send(newLand)
  .expect(201)
  .then(( response : Response ) => {
    const responseBody: AddedLandsResponseBody = response.body;
        const land: LandSample = responseBody.addedLand;
        expect(land.username).toBe("username1");
        expect(land.city).toBe(newLand.city);
        expect(land.country).toBe('countryexample1');
        expect(land.land_img_url).toBe(newLand.land_img_url);
        expect(land.landname).toBe(newLand.landname);

      })
  })
})

describe.skip("PATCH /api/lands/:land_id", ()=>{
  test("PATCH- status: 202- responds with the updated land",()=>{
    const votesUpdate = { inc_votes : 1 };
    return request(app)
    .patch('/api/lands/2')
    .send(votesUpdate)
    .expect(202)
    .then(({ body }: Response) => {
          expect(body.updatedLand.vote).toBe(9);
        })
  })

  test("PATCH- status: 202- responds with the updated land",()=>{
    const votesUpdate = { inc_votes : -1 };
    return request(app)
    .patch('/api/lands/2')
    .send(votesUpdate)
    .expect(202)
    .then(({ body }: Response) => {
          expect(body.updatedLand.vote).toBe(7);
        })
  })

})

describe.skip("DELETE - /api/lands/:land_id", ()=>{
  test("DELETE - status: 204 , respond with no content",()=>{
    return request(app)
    .delete("/api/lands/2")
    .expect(204)
  })
})

describe.skip("DELETE - /api/comments/:comment_id", ()=>{
  test("DELETE - status: 204 , respond with no content",()=>{
    return request(app)
    .delete("/api/comments/1")
    .expect(204)
  })
})