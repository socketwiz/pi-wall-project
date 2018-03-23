
export const UPDATE_HELLO = 'UPDATE_HELLO';
export const UPDATE_HELLOS = 'UPDATE_HELLOS';

export function updateHello(hello) {
    return {
        'type': UPDATE_HELLO,
        'hello': hello
    };
}
export function updateHellos(hellos) {
    return {
        'type': UPDATE_HELLOS,
        'hellos': hellos
    };
}
