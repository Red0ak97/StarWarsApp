

class StarWarsServices {
    _apiBase = 'https://swapi.dev/api/';
    _baseOffset = 1;


    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}people/?page=${offset}`);
        return {
            results: res.results.map(this._transformPeople),
            count: res.count,
            next: res.next
        };
    }

    getCharacters = async (id) => {
        const res = await this.getResource(`${this._apiBase}people/${id}`)
        return this._transformPeople(res);
    }

    _transformPeople = (res) => {
    const id = res.url.split('/').slice(-2, -1)[0]; // Извлекает "1" из "https://swapi.dev/api/people/1/"
    return {
        id: id, // Сохраняем ID
        name: res.name,
        url: res.url,
        homeworld: res.homeworld,
        }
    }
}

export default StarWarsServices;