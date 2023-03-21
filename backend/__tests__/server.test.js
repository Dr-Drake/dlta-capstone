const app = require("../src/app");
const request = require("supertest");

app.server = app.listen(3000);

describe("Server", () => {
  afterEach(() => app.server.close());

  it("Should listen to HTTP requests", (done) => {
    request(app)
      .get("/api/devplace")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
