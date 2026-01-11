export const handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
  };

  try {
    const response = {
      statusCode: 200,
      headers: headers,
        body: JSON.stringify({
        message: "IssuePilot backend is running"
      }),
    };
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message
      }),
    };
  }
};
