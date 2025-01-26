const apiRequest = async (url = '', optionsObj = '', errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj);

    if (!response.ok) {
      throw Error(`Error: ${response.statusText}`);
    }
  } catch (err) {
    console.error('API Request Failed:', err);  // Enhanced error logging
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
