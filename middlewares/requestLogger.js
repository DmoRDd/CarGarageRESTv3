const requestLogger = async (req, res, next) => {
    try{
        console.log(`====== New Request ======
            
${new Date().toISOString().split('T')[1]}: ${req.method} Request To ${req.url}
Platform: ${process.platform}; 
            `);

            next();
    }catch(err){
        console.error(`Error while doing ${req.method} request. Error: ${err}`);
    }
} 

export default requestLogger;