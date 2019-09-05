const removeClient = (clientArray, request) => {
  clientArray.forEach((obj, i) => {
    if (request.ip == obj.ip) {
      clientArray.splice(i, 1)
    }
  });
}

module.exports = removeClient;