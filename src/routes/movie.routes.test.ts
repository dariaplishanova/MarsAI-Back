import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../app.js";
import { resetDatabase } from "../helpers/resetDatabase.js";

beforeEach(async () => {
  await resetDatabase();
});

describe("GET /movies", () => {
  it("retourne 200 et la liste des movies", async () => {
    const response = await request(app).get("/movies");
    
    expect(response.status).toBe(200);
    
    expect(response.body.success).toBe(true);
    
    expect(Array.isArray(response.body.data)).toBe(true);
    
    expect(response.body.data).toHaveLength(1); 
    expect(response.body.data[0].title).toBe("Interstellar");
  });
});