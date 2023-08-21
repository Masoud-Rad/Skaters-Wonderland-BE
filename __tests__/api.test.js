"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app = require('../app');
const connection = require('../db/connection');
const seed = require('../db/seeds/seed');
const devData = require('../db/data/test-data/index');
beforeEach(() => seed(devData.landData, devData.commentData, devData.userData));
afterAll(() => connection.end());
describe("GET WRONG END-POINT", () => {
    test("GET - status: 404 - not exist", () => {
        return request(app)
            .get("/wrongEndPoint")
            .expect(404)
            .then((response) => {
            expect(response.body.msg).toBe("Not Found!");
        });
    });
    test("GET - status: 404 - not exist", () => {
        return request(app)
            .get("/api/nonsence")
            .expect(404)
            .then((response) => {
            expect(response.body.msg).toBe("Not Found!");
        });
    });
});
describe("GET /api/users", () => {
    test("GET - status: 200 - respond with all the properties", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then((response) => {
            const responseBody = response.body;
            const users = responseBody.users;
            const expectedResult = [
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
        });
    });
});
describe("GET /api/users/?username", () => {
    test("GET - status: 404 - not exist", () => {
        return request(app)
            .get("/api/users/?username=username500")
            .expect(404)
            .then((response) => {
            expect(response.body.msg).toBe("Not Found!");
        });
    });
    test("GET - status: 200 - respond with a specific land's info", () => {
        return request(app)
            .get("/api/users/?username=username3")
            .expect(200)
            .then((response) => {
            const responseBody = response.body;
            const user = responseBody.users[0];
            const expectedResult = {
                username: 'username3',
                name: 'name3',
                avatar_url: 'https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729',
                password: "nk2nkl2nk"
            };
            expect(user).toEqual(expectedResult);
        });
    });
});
describe("GET /api/lands", () => {
    test("GET - status: 200 - respond with all the lands", () => {
        return request(app)
            .get("/api/lands")
            .expect(200)
            .then((response) => {
            const responseBody = response.body;
            const lands = responseBody.lands;
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
            ];
            expect(lands).toEqual(expectedResult);
        });
    });
});
describe("GET /api/lands/?city", () => {
    test("GET - status: 200 - respond with all the lands filtered by city", () => {
        return request(app)
            .get("/api/lands/?city=Cityexample2")
            .expect(200)
            .then((response) => {
            const responseBody = response.body;
            const lands = responseBody.lands;
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
            ];
            expect(lands).toEqual(expectedResult);
        });
    });
});
describe("GET /api/lands/?city&sort_by&order_by", () => {
    test("GET - status: 200 - check is result is sorted", () => {
        return request(app)
            .get("/api/lands/?sort_by=landname&order_by=DESC")
            .expect(200)
            .then((response) => {
            const responseBody = response.body;
            const lands = responseBody.lands;
            const expectedResult = [
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
                    land_id: 1,
                    landname: 'First land',
                    city: 'Cityexample1',
                    country: 'countryexample1',
                    description: 'popular place for skating on the weekends!  Media City Salford Quays is set in the Salford district of Manchester, 400 metres from The Lowry and 4.3 km from Opera House Manchester.',
                    vote: 8,
                    created_at: '2023-08-10T11:00:00.000Z',
                    land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                    username: 'username1'
                }
            ];
            expect(lands).toEqual(expectedResult);
        });
    });
});
describe("GET /api/lands/?sort_by&order_by", () => {
    test("GET - status: 200 - check is result is sorted", () => {
        return request(app)
            .get("/api/lands/?city=Cityexample2&sort_by=landname&order_by=DESC")
            .expect(200)
            .then((response) => {
            const responseBody = response.body;
            const lands = responseBody.lands;
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
            ];
            expect(lands).toEqual(expectedResult);
        });
    });
});
describe("GET /api/lands/:land_id", () => {
    test("GET - status: 400 - when add NON integer id should recive error", () => {
        return request(app)
            .get("/api/lands/any_id")
            .expect(400)
            .then((response) => {
            expect(response.body.msg).toBe("invalid input syntax or type!");
        });
    });
    test("GET - status: 404 - not exist", () => {
        return request(app)
            .get("/api/lands/500")
            .expect(404)
            .then((response) => {
            expect(response.body.msg).toBe("Not Found!");
        });
    });
    test("GET - status: 200 - respond with a specific land's info", () => {
        return request(app)
            .get("/api/lands/2")
            .expect(200)
            .then((response) => {
            const responseBody = response.body;
            const land = responseBody.land;
            const expectedResult = {
                land_id: 2,
                landname: 'Second land',
                city: 'Cityexample2',
                country: 'countryexample2',
                description: 'Urban park with a championship golf course  for grown-ups, farm animals and play areas for kids.',
                vote: 8,
                created_at: '2023-08-10T11:00:00.000Z',
                land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
                username: 'username2'
            };
            expect(land).toEqual(expectedResult);
        });
    });
});
describe("GET /api/lands/:land_id/comments", () => {
    test("GET - status: 400 - when add NON integer id should recive error", () => {
        return request(app)
            .get("/api/lands/any_id/comments")
            .expect(400)
            .then((response) => {
            expect(response.body.msg).toBe("invalid input syntax or type!");
        });
    });
    test("GET - status: 404 - not exist", () => {
        return request(app)
            .get("/api/lands/500/comments")
            .expect(404)
            .then((response) => {
            expect(response.body.msg).toBe("Not Found!");
        });
    });
    test("GET - status: 200 - respond with a specific land's info", () => {
        return request(app)
            .get("/api/lands/2/comments")
            .expect(200)
            .then((response) => {
            const responseBody = response.body;
            const comments = responseBody.comments;
            const expectedResult = [
                {
                    comment_id: 3,
                    body: "kkQui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
                    username: "username2",
                    land_id: 2,
                    created_at: "2023-08-10T11:00:00.000Z"
                }
            ];
            expect(comments).toEqual(expectedResult);
        });
    });
});
describe("POST /api/lands/:land_id/comments", () => {
    test("POST- status: 203- responds with error because username does not exist", () => {
        const newComment = {
            "body": "this is my test_add_comment body",
            "username": "username500"
        };
        return request(app)
            .post('/api/lands/3/comments')
            .send(newComment)
            .expect(203)
            .then((response) => {
            expect(response.body.msg).toBe("Non-Authoritative Information!");
        });
    });
    test("POST- status: 203- responds with error because not sending correct information", () => {
        const newComment = {
            "body": "this is my test_add_comment body"
        };
        return request(app)
            .post('/api/lands/3/comments')
            .send(newComment)
            .expect(400)
            .then((response) => {
            expect(response.body.msg).toBe("BAD REQUEST!");
        });
    });
    test("POST- status: 203- responds with error because not sending correct information", () => {
        const newComment = {
            "text": "this is my test_add_comment body",
            "username": "username1"
        };
        return request(app)
            .post('/api/lands/3/comments')
            .send(newComment)
            .expect(400)
            .then((response) => {
            expect(response.body.msg).toBe("BAD REQUEST!");
        });
    });
    test("POST- status: 201- responds with the added comment", () => {
        const newComment = {
            "body": "this is my test_add_comment body",
            "username": "username1"
        };
        return request(app)
            .post('/api/lands/3/comments')
            .send(newComment)
            .expect(201)
            .then((response) => {
            const responseBody = response.body;
            const comment = responseBody.addedComment;
            expect(comment.username).toBe("username1");
            expect(comment.body).toBe(newComment.body);
            expect(comment.land_id).toBe(3);
        });
    });
});
describe("POST /api/land", () => {
    test("POST- status: 203- responds with error because username does not exist", () => {
        const newLand = {
            landname: 'Forth land',
            city: 'Cityexample1',
            country: 'countryexample1',
            description: 'test description',
            land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
            username: 'username500'
        };
        return request(app)
            .post('/api/land')
            .send(newLand)
            .expect(203)
            .then((response) => {
            expect(response.body.msg).toBe("Non-Authoritative Information!");
        });
    });
    test("POST- status: 203- responds with error because not sending correct information", () => {
        const newLand = {
            name: 'Forth land',
            city: 'Cityexample1',
            country: 'countryexample1',
            description: 'test description',
            land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
            username: 'username500'
        };
        return request(app)
            .post('/api/land')
            .send(newLand)
            .expect(400)
            .then((response) => {
            expect(response.body.msg).toBe("BAD REQUEST!");
        });
    });
    test("POST- status: 203- responds with error because not sending correct information", () => {
        const newLand = {
            landname: 'Forth land',
            description: 'test description',
            land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
            username: 'username500'
        };
        return request(app)
            .post('/api/land')
            .send(newLand)
            .expect(400)
            .then((response) => {
            expect(response.body.msg).toBe("BAD REQUEST!");
        });
    });
    test("POST- status: 201- responds with the added comment", () => {
        const newLand = {
            landname: 'Forth land',
            city: 'Cityexample1',
            country: 'countryexample1',
            description: 'test description',
            land_img_url: 'https://thedeveloper.live/AcuCustom/Sitename/DAM/130/MediaCityUKlead.jpg',
            username: 'username1'
        };
        return request(app)
            .post('/api/land')
            .send(newLand)
            .expect(201)
            .then((response) => {
            const responseBody = response.body;
            const land = responseBody.addedLand;
            expect(land.username).toBe("username1");
            expect(land.city).toBe(newLand.city);
            expect(land.country).toBe('countryexample1');
            expect(land.land_img_url).toBe(newLand.land_img_url);
            expect(land.landname).toBe(newLand.landname);
        });
    });
});
describe("PATCH /api/lands/:land_id", () => {
    test("PATCH- status: 202- responds with the updated land", () => {
        const votesUpdate = { inc_votes: 1 };
        return request(app)
            .patch('/api/lands/2')
            .send(votesUpdate)
            .expect(202)
            .then(({ body }) => {
            expect(body.updatedLand.vote).toBe(9);
        });
    });
    test("PATCH- status: 202- responds with the updated land", () => {
        const votesUpdate = { inc_votes: -1 };
        return request(app)
            .patch('/api/lands/2')
            .send(votesUpdate)
            .expect(202)
            .then(({ body }) => {
            expect(body.updatedLand.vote).toBe(7);
        });
    });
});
describe("DELETE - /api/lands/:land_id", () => {
    test("DELETE - status: 204 , respond with no content", () => {
        return request(app)
            .delete("/api/lands/2")
            .expect(204);
    });
});
describe("DELETE - /api/comments/:comment_id", () => {
    test("DELETE - status: 204 , respond with no content", () => {
        return request(app)
            .delete("/api/comments/1")
            .expect(204);
    });
});
//# sourceMappingURL=api.test.js.map