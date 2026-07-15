const errHandler = (err, req, res, next) => {
    //if a status code is not set , default set to 500( bad server)
    let statusCode = res.statusCode ===200?500 : res.statusCode;

    // agar koi object id error ho to

    if(err.name === "CasteError" && err.kind === "ObjectId"){ 
        statusCode = 404;
        message:"Resource not found"
    }

    //  kisi bhi schema me validation error ho to

    if (err.name === "ValidationError"){
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(", ");
    }

    if(err.code === 11000){
        statusCode = 400;
        message = "Duplicate email entered";
    }
}
export default errHandler;