export const isAuthenticated = () => {
    return localStorage.getItem('simplebks-user') !== null
}

export const setLoggedInUser = (user: Record<string, any>) => {
    const stringifyUser = JSON.stringify(user);
    localStorage.setItem('simplebks-user', stringifyUser)
}

export const currentUser = () => {
    if (isAuthenticated()) {
        const user = localStorage.getItem('simplebks-user')
        const userDetails = {
            username: JSON.parse(user as string).username,
            password: JSON.parse(user as string).password
        }
        return userDetails
    }
    return null
}

export const removeUser = () => localStorage.clear()