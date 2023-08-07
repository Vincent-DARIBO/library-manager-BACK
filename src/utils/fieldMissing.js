export default function fieldMissing(object, fields = []) {
    for (let field of fields) {
        if (!Object.keys(object).includes(field)) {
            return true
        }
    }
    return false
}