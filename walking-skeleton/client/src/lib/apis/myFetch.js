const myFetch = async ( url, options = {}, timeoutMs = 5000) => {
    let attempts = 0;
    let maxAttempts = 2;

    while (attempts < maxAttempts){
        try {
            const response = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(timeoutMs),
            });
            if (!response.ok){
                let errorMessage = response.statusText;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || JSON.stringify(errorData);
                } catch (_) {}
                return { data: null, error: errorMessage};
            };
            const data = await response.json();
            return { data, error: null};
        } catch (error){
            if (error?.name === "TimeoutError"){
                attempts += 1;
                if (attempts >= maxAttempts){
                    return {data: null , error: "Timeout... The request took too long."};
                }
            } else {
                return { data: null, error: error.message};
            };
        };
    };
};

export { myFetch };