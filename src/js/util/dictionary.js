const USER_STATES = Object.freeze({
    IS_LOGGED : Symbol('El usuario esta logueado'),
    IS_NOT_LOGGED: Symbol('El usuario no esta logueado')
});

const MAP_TYPE = Object.freeze({
    BASE_MAP : "basemap"
})

const RESPONSIVE_DISPLAYS = Object.freeze({
    MOBILE : 768
})

const SIGN_IN_STATUS = Object.freeze({
    SIGN_IN: "Ingresar",
    SIGN_UP: "Cerrar sesión"
})

export { USER_STATES, MAP_TYPE, RESPONSIVE_DISPLAYS, SIGN_IN_STATUS };