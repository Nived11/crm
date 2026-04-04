interface ErrorResponse {
  title: string;
  description: string;
}

export function extractErrorMessages(error: any): ErrorResponse {
  let title = "Oops!";
  let description = "Something went wrong.";

  if (!error?.response) {
    if (error?.message?.includes("Network Error")) {
      return { title: "No Internet", description: "Please check your internet connection" };
    }
    return { title: "Connection Error", description: error?.message || description };
  }

  const status = error.response.status;
  const data = error.response.data;

 if (status === 404) {
    title = "Not Found";
    description = "The requested item was not found.";
  } else if (status >= 500) {
    title = "Server Error";
    description = "Please try again after some time.";
  } else if (status === 401) {
    title = "Session Expired";
    description = "Please login again to continue.";
  } else if (status === 403) {
    title = "Access Denied";
    description = "You don't have permission for this.";
  } else {
    const apiMessage = data?.message || data?.error || data?.detail;
    if (apiMessage) {
      description = apiMessage;
    } else if (typeof data === "object") {
      const messages: string[] = [];
      const stack = [data];
      while (stack.length > 0) {
        const current = stack.pop();
        if (typeof current === "string") {
          if (!/<(html|head|body|!DOCTYPE)/i.test(current)) messages.push(current);
        } else if (Array.isArray(current)) {
          stack.push(...current);
        } else if (typeof current === "object" && current !== null) {
          stack.push(...Object.values(current));
        }
      }
      if (messages.length) description = messages.join(", ");
    }
  }

  return { title, description };
}