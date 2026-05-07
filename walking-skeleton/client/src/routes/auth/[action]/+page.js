import { error } from "@sveltejs/kit";

// Dynamic routes : auth/login or auth/register routed to action folder
export const load = ({ params }) => {
    // action parameter contain url values
    if (params.action !== "login" && params.action !== "register"){
        throw error(404, "Page not found");
    }
    return params;
};