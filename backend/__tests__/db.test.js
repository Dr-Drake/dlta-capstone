import mongoose from "mongoose";



describe("database tests",()=>{

    test("database connection is established successfully", async () => {
        const db_uri = "mongodb+srv://dlta:1SKJ8hxBq30uLRb2@cluster0.iebwm.mongodb.net/dlta-capstone?retryWrites=true&w=majority";
        const connection = await mongoose.connect(db_uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        expect(connection).toBeDefined();
        mongoose.connection.close()
      });
      
})