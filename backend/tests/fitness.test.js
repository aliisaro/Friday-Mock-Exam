const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Fitness = require("../models/fitnessModel");

const fitness = [
  {
    title: "Running",
    date: "2021-10-10",
    duration: 30,
    caloriesBurned: 300,
  },
  {
    title: "Cycling",
    date: "2021-10-10",
    duration: 60,
    caloriesBurned: 600,
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/users/signup")
    .send({ email: "sanchos1337@sanchos1337.com", password: "12345ASDqwe@£$" });
  token = result.body.token;
});

describe("Given there is fitness data in the database", () => {
  beforeEach(async () => {
    await Fitness.deleteMany({});
    await api 
    .post("/api/fitness")
      .set("Authorization", "Bearer" + token)
      .send(fitness[0])
      .send(fitness[1]);
  });

  //GET ALL FITNESS DATA
  it("should return all fitness as JSON when GET /api/fitness is called", async () => {
    await api
      .get("/api/fitness")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

  //ADD FITNESS DATA
  it("should create fitness data when POST /api/fitness is called", async () => {
    const fitness = {
      title: "Running",
      date: "2021-10-10",
      duration: 30,
      caloriesBurned: 300,
    };
    await api
      .post("/api/fitness")
      .set("Authorization", "bearer " + token)
      .send(fitness)
      .expect(201);
  });

  //GET fitness DATA BY ID
  it("should return fitness data by ID when GET /api/fitness/:id is called", async () => {
    const fitness = await Fitness.findOne();
    await api
      .get("/api/fitness/" + fitness._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });


  //UPDATE fitness data BY ID
  it("should update one fitness data by ID when PUT /api/fitness/:id is called", async () => {
    const fitness = await Fitness.findOne();
    const updatedfitness = {
      title: "Running",
      date: new Date(),
      duration: 20,
      caloriesBurned: 400,
    };
    await api
      .put("/api/fitness/" + fitness._id)
      .set("Authorization", "bearer " + token)
      .send(updatedfitness)
      .expect(200);

    const updatedfitnessCheck = await Fitness.findById(fitness._id);
    expect(updatedfitnessCheck.toJSON()).toEqual(
      expect.objectContaining(updatedfitness)
    );
  });

  //DELETE fitness BY ID
  it("should delete fitness data by ID when DELETE api/fitnesss/:id is called", async () => {
    const fitness = await Fitness.findOne();
    await api
      .delete("/api/fitness/" + fitness._id)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const fitnessCheck = await Fitness.findById(fitness._id);
    expect(fitnessCheck).toBeNull();
  });

afterAll(() => {
  mongoose.connection.close();
});
