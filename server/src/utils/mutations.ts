export const registerMutation = (
    email: string,
    password: string,
    fullname: string,
    username: string
) => `
    mutation {
        register(email: "${email}", password: "${password}", fullname: "${fullname}", username: "${username}") {
            ok,
            error
        }
    }
`

export const loginMutation = (email: string, password: string) => `
    mutation {
        login(email: "${email}", password: "${password}") {
            ok,
            error
        }
    }
`

export const loginMutationWithToken = (email: string, password: string) => `
    mutation {
        login(email: "${email}", password: "${password}") {
            token
        }
    }
`