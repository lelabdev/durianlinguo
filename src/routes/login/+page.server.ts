import { superValidate } from "sveltekit-superforms/server";
import { fail } from "@sveltejs/kit";
import { loginSchema } from "$lib/schema/login";

export const load = async () => {
  const form = await superValidate(loginSchema);
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, loginSchema);
    if (!form.valid) return fail(400, { form });

    // Simule une requête vers un service d’authentification inexistant
    console.log("Would login:", form.data);

    return { form, success: true };
  },
};
