import { app } from "../../app.js";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";


Deno.test({
    name: "Fetch random question API",
    async fn() {
        const testClient = await superoak(app);
        const question_id = `${Math.floor(Math.random())}`;
        const option_id = `${Math.floor(Math.random())}`;
        const obj = {
            questionId: question_id,
            optionId: option_id,
        };

        await testClient.post("/api/questions/answer")
            .send(obj)
            .expect(200)
            .expect("Content-Type", new RegExp("application/json"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Answer a question API",
    async fn() {
      const testClient = await superoak(app);

      await testClient.get("/api/questions/random")
          .expect(200)
          .expect("Content-Type", new RegExp("application/json"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

