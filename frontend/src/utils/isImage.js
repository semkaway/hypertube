export default function isImage(url) {
    return new Promise(function (resolve, reject) {
        const img = new Image()
        img.onerror = img.onabort = function () { reject(false) }
        img.onload = function () { resolve(true) }
        img.src = url
    });
}