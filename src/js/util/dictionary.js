const USER_STATES = Object.freeze({
    IS_LOGGED : Symbol('El usuario esta logueado'),
    IS_NOT_LOGGED: Symbol('El usuario no esta logueado')
});

const MAP_TYPE = Object.freeze({
    BASE_MAP : "basemap"
});

const RESPONSIVE_DISPLAYS = Object.freeze({
    MOBILE : 768
});

const SIGN_IN_STATUS = Object.freeze({
    SIGN_IN: "Ingresar",
    SIGN_UP: "Cerrar sesión"
});

const CLASS_NAME_TYPES = Object.freeze({
    SUCESS: 'success',
    REJECTED: 'rejected',
    HIDDEN: 'hidden'
});

const MESSAGES_TYPES = Object.freeze({
    MESSAGE_SENT: 'El reporte ha sido enviado con éxito',
    MESSAJE_REJECTED: 'No se ha podido enviar el reporte. Intente más tarde',
    TRANQUERA_NOT_FOUND: 'Tranquera no encontrada',
    ENTER_AGAIN_TRANQUERA: 'Por favor, vuelva a ingresar el número de tranquera',
    NOT_ACCESS: 'Necesita loguearse para poder acceder a esta función',
    CORRECT_LOGIN: 'Se ha inicado sesión correctamente',
    INCORRECT_LOGIN: 'Usuario/ contraseña incorrecta ingrese nuevamente',
    CORRECT_SING_UP: 'Se ha cerrado sesión correctamente'
})

const OPTIONS_MENU = Object.freeze({
    HELP_MENU: 'Ayuda',
    REPORT_PROBLEM: 'Notificar un problema'
})

export { USER_STATES, MAP_TYPE, RESPONSIVE_DISPLAYS, SIGN_IN_STATUS, CLASS_NAME_TYPES, MESSAGES_TYPES, OPTIONS_MENU };