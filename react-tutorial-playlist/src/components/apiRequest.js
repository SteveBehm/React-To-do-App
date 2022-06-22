// create async function with url, optionsObj, and errMsg params and initialize them
const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
  try {
    // the optionsObj is what will make this a create, update, delete request
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error('Please reload the app');

  } catch (err) {
    errMsg = err.message;

  } finally {
    return errMsg;
  }
}

export default apiRequest;
