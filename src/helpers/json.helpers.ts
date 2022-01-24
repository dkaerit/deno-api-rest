export class JsonHelper {
    public static fixStringFormat(message:string) {
        return message
        .replace(/:\s*"([^"]*)"/g, (_, p1) => ': "' + p1.replace(/:/g, '@colon@') + '"') // Replace ":" with "@colon@" if it's between double-quotes
        .replace(/:\s*'([^']*)'/g, (_, p1) => ': "' + p1.replace(/:/g, '@colon@') + '"') // Replace ":" with "@colon@" if it's between single-quotes
        .replace(/(['"])?([a-z0-9A-Z$_]+)(['"])?\s*:/g, '"$2": ') // Add double-quotes around any tokens before the remaining ":"
        .replace(/@colon@/g, ':') // Turn "@colon@" back into ":"
    }
}