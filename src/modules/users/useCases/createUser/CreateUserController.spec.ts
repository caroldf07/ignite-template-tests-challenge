import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import createDbConnection from "../../../../database";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createDbConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("deve retornar 201 com resposta vazia", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({ name: "teste", email: "email@email.com.br", password: "senha" });

    expect(response.status).toBe(201);
  });
});
