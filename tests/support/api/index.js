import { expect, request } from "playwright/test"
export class Api {
    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy()
        const body = JSON.parse(await response.text())
        this.token = body.token
        console.log(this.token)
        //console.log(body.token)
    }
    async postMovie(movie) {
        const companyId = await this.getCompanyIdByName(movie.company)

        await this.setToken()
        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: 'Bearer ' + this.token,
                ContentType: 'application/json, text/plain, */*',
                Accept: 'apli'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                featured: movie.featured,
                release_year: movie.release_year,
                company_id: companyId
            }
        })
        expect(response.ok()).toBeTruthy()

    }
    async getCompanyIdByName(companyName) {
        await this.setToken()
        const response = await this.request.get('http://localhost:3333/companies', {
            headers: {
                Authorization:'Bearer '+ this.token,
                ContentType: 'application/json, text/plain, */*',
                Accept: 'apli'
            },
            params: {
                name: companyName
            }
        })
        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        return body.data[0].id
    }
}