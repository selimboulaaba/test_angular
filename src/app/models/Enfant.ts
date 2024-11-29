export interface Enfant {
    id: number,
    user: {
        first_name: string,
        last_name: string,
        birthday: string,
        gender: string,
        photo: string,
        email: string
    },
    parent: {
        id: number,
    }
}