const Mongoose = require("mongoose");
module.exports = function(app){
    const BookModel = Mongoose.model("book", { 
        id: Number,
        tittle: String,
        author: [ String , String],
        published_date: Date,
        pages: Number,
        language: String,
        publisher_id: String
    });
    
    app.post("/books", async (req,res) =>{
        try{
            var book= new BookModel(req.body);
            var result = await book.save();
            res.status(200).send(result);
        } catch(error){
            res.status(500).send(error);
        }
    });
    
    app.get("/books", async (request, response) => {
        try {
        var result = await BookModel.find().exec();
        response.send(result);} catch (error) {
        response.status(500).send(error);
        }
        });
    app.get("/books/:id", async (request, response) => {
         try {
            var book = await BookModel.findById(request.params.id).exec();
            response.send(book);
            } catch (error) {
            response.status(500).send(error);
            }
        });
    app.put("/books/:id", async (request, response) => {
        try {
            var book = await BookModel.findById(request.params.id).exec();
            book.set(request.body);
            var result = await book.save();
            response.send(result);
            } catch (error) {
            response.status(500).send(error);
            }
            });
    app.delete("/books/:id", async (request, response) => {
        try {
            var result = await BookModel.deleteOne({ id: request.params.id }).exec( );
                response.send(result);
                } catch (error) {
                response.status(500).send(error);
                }
                });
}