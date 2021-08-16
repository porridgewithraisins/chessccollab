export const generateRandomRoomID = (length) => {
    const result = [];
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const len = charSet.length;
    for (let i = 0; i < length; i++) {
        let randomIdx = Math.floor(Math.random() * len);
        result.push(charSet[randomIdx]);
    }
    return result.join('');
};
