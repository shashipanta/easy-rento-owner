import {z} from "zod";

const MIN_PASSWORD_LEN = 5;
const MAX_PASSWORD_LEN = 5;

const PasswordBaseSchema = z.string()
                        .min(MIN_PASSWORD_LEN)
                        .max(MAX_PASSWORD_LEN);

const EmailBaseSchema = z.string()
                         .email();

const PasswordSchema = z.object({
        password: PasswordBaseSchema,
        confirmPassword: PasswordBaseSchema
    })
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
});


// todo: create a utility method to extract error from ZodError
function extractZodError(error: string) {
    return "something";
}


export {PasswordSchema};



