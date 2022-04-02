const base = "https://nguyenhongphat0.github.io/inisev-test/api";

export function request(path) {
    return fetch(`${base}/${path}`);
}

export function getUsers() {
    return request('users').then(res => res.json());
}