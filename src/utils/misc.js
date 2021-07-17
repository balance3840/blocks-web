export function getAuthUser() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
}

export function isAdmin() {
    const user = getAuthUser();
    const isAdmin = user.role.id === 1;
    return isAdmin;
}

export function isTeacher() {
    const user = getAuthUser();
    const isTeacher = user.role.id === 2;
    return isTeacher;
}

export function isStudent() {
    const user = getAuthUser();
    const isTeacher = user.role.id === 3;
    return isTeacher;
}

export function getUserDisplayName(user = null) {
    user = user || getAuthUser();
    return `${user.name} ${user.lastname}`
}