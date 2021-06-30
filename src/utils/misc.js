export function getAuthUser() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
}

export function isAdmin() {
    const user = getAuthUser();
    const isAdmin = user.role.name === "Administrador";
    return isAdmin;
}

export function isTeacher() {
    const user = getAuthUser();
    const isTeacher = user.role.name === "Profesor";
    return isTeacher;
}

export function getUserDisplayName(user = null) {
    user = user || getAuthUser();
    return `${user.name} ${user.lastname}`
}