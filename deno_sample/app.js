
const handleRequest = (request) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const method = request.method;
  let message = "";
 if (method === "SUM" && url.pathname === "/" ){
    if (params.has("a") && params.has("b")){
        const a = Number(params.get("a"));
        const b = Number(params.get("b"));
        message = a+b;
        console.log("Message sum:", message);
        
    } else {
        message = "Invalid parameters";
    };
  } else if (url.pathname === "/"){
    message = "Hi there!";
  }
  else if (url.pathname === "/congrats" && params.has("heroOfTheDay")){
    message = `Congrats, ${params.get("heroOfTheDay")}!`;
  }  else if ( method === "DIDNOT" && url.pathname === "/lol") {
    message = "What kind of tree fits in your hand? A palm tree."
  }else {
    message = "Not here";
  };
  return new Response(message);
};

export default handleRequest;
