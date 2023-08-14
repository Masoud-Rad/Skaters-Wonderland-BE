const request = require("supertest")
const app = require('../app')
const connection = require('../db/connection')
const seed = require('../db/seeds/seed')
const devData = require('../db/data/test-data/index')


beforeEach(() => seed(devData.landData, devData.commentData, devData.userData))
afterAll(() => connection.end())

//-------------------------Tyoes---------------------------------
interface response404 {
body: {msg:string};
}

import { Response } from 'supertest';

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

interface ResponseBody {
    lands: LandSample[];
  }


describe("GET /api/lands",()=>{
    test("GET - status: 404 - not exist", ()=>{
        return request(app)
        .get("/wrongEndPoint")
        .expect(404)
        .then((response : response404)=>{
            expect(response.body.msg).toBe("Not Found!")
        })
    })
    test("GET - status: 200 - respond with all the properties",()=>{
        return request(app)
        .get("/api/lands")
        .expect(200)
        .then((response : Response)=>{
            const responseData: ResponseBody = response.body;
            const lands: LandSample[] = responseData.lands;
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