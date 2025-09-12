export function findTextByTag(data, tag) {
    try {
        return data.find(obj => obj.title === tag).text;
    } catch {
        console.log(`Cannot find title with name: ${tag}`);
        return "null";
    }
}