// const API_KEY = '21492726-451e87d3f3afe144072272f85';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImage() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      page: this.page,
      per_page: 20,
      key: '21492726-451e87d3f3afe144072272f85',
    });

    const url = `${BASE_URL}${searchParams}`;
    // const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=20&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error => console.log('error', error));
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
