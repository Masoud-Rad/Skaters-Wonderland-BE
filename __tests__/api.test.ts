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
  avatar_url: string;
  password: string;
}

interface UsersResponseBody {
    users: UsersSample[];
  }


//**** landsType
interface LandSample {
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

interface LandsResponseBody {
    lands: LandSample[];
  }
interface SingleLandsResponseBody {
    land: LandSample;
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
            const expectedResult =  [
              {
                  username: 'username1',
                  name: 'name1',
                  avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
                  password: "jnhiu877"
              },
              {
                  username: 'username2',
                  name: 'name2',
                  avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013',
                  password: "87987hjjk"
              },
              {
                  username: 'username3',
                  name: 'name3',
                  avatar_url: 'https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729',
                  password: "nk2nkl2nk"
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
      .get("/api/users/?username=username3")
      .expect(200)
      .then((response : Response)=>{
        const responseBody: UsersResponseBody = response.body;
        const user: UsersSample = responseBody.users[0];
          const expectedResult ={
                                  username: 'username3',
                                  name: 'name3',
                                  avatar_url: 'https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729',
                                  password: "nk2nkl2nk"
                                }
            
          expect(user).toEqual(expectedResult);
  
      })
    })
  })

describe("GET /api/lands",()=>{
    test("GET - status: 200 - respond with all the properties",()=>{
        return request(app)
        .get("/api/lands")
        .expect(200)
        .then((response : Response)=>{
            const responseBody: LandsResponseBody = response.body;
            const lands: LandSample[] = responseBody.lands;
            const expectedResult = [
                {
                  land_id: 1,
                  landname: 'First land',
                  city: 'Cityexample1',
                  country: 'countryexample1',
                  description: 'popular place for skating on the weekends!  Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
                  vote: 8,
                  created_at: '2023-08-10T11:00:00.000Z',
                  land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                  username: 'username1'
                },
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
                },
                {
                  land_id: 3,
                  landname: 'Third land',
                  city: 'Cityexample3',
                  country: 'countryexample3',
                  description: 'popular place for skating on the  weekends! Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
                  vote: 8,
                  created_at: '2023-08-10T11:00:00.000Z',
                  land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                  username: 'username1'
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