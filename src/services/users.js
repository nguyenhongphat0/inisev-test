export function getUsers() {
    return fetch('/api/users').then(res => res.json());
}