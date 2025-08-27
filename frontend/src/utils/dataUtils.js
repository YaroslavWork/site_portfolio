export function findTextByTag(data, tag) {
    return data.find(obj => obj.title === tag).text
}