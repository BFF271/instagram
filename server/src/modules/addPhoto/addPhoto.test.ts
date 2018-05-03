import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    addPhoto
} from '../../utils/mutations'
import { Photo } from '../../entity/Photo'

let getHost = () => ''

beforeAll(async () => {
    const app = await startServer()
    const { port } = app.address()
    getHost = () => `http://127.0.0.1:${port}`
})

const email = 'm@m.com'
const password = 'mm'
const fullname = 'Marcin Miler'
const username = 'Marcinek'
const url = 'url.jpg'
const text = 'New photo :)'

describe('Mutation addPhoto', async () => {
    it('should add new photo', async () => {
        await request(
            getHost(),
            registerMutation(email, password, fullname, username)
        )
        const login: any = await request(
            getHost(),
            loginMutationWithToken(email, password)
        )
        const { token } = login.login

        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response = await client.request(addPhoto(url, text))

        expect(response).toEqual({ addPhoto: true })

        const photo = await Photo.find({
            select: ['id', 'url', 'userId']
        })

        expect(photo).toMatchSnapshot()
    })
})