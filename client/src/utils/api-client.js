class APIClient {
  constructor(authToken = null) {
    this.baseURL = "http://localhost:3000";
    this.authToken = authToken;
    this.abortController = new AbortController();
  }

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return response;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return response;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  cancel() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}

export default APIClient;
