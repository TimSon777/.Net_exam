export default function enumKeys<E>(e: E) {
    const keys = Object.keys(e).filter((element) => {
        return isNaN(Number(element));
    });
    return keys as (keyof E)[];
}