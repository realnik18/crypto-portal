import { toast } from "sonner";

/**
 * HTTP request methods
 */
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * Base API configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  TIMEOUT: 10000,
  RETRY_COUNT: 2,
  RETRY_DELAY: 1000,
};

/**
 * API response type
 */
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * Error class for API requests
 */
export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public data: any;

  constructor(message: string, status: number, statusText: string, data: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * Base API client with error handling and retries
 */
export const apiClient = {
  /**
   * Performs an API request with automatic retries
   */
  async request<T = any>(
    endpoint: string,
    method: HttpMethod = HttpMethod.GET,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add authentication if available
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
      ...options,
      body: data ? JSON.stringify(data) : undefined,
    };

    return this.fetchWithRetry<T>(url, config);
  },

  /**
   * Performs a GET request
   */
  async get<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.GET, undefined, options);
  },

  /**
   * Performs a POST request
   */
  async post<T = any>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.POST, data, options);
  },

  /**
   * Performs a PUT request
   */
  async put<T = any>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.PUT, data, options);
  },

  /**
   * Performs a DELETE request
   */
  async delete<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.DELETE, undefined, options);
  },

  /**
   * Helper function to perform fetch with retry logic
   */
  async fetchWithRetry<T>(
    url: string,
    config: RequestInit,
    retryCount = API_CONFIG.RETRY_COUNT
  ): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const responseData = await this.parseResponse(response);
      
      if (!response.ok) {
        throw new ApiError(
          responseData.message || `Request failed with status ${response.status}`,
          response.status,
          response.statusText,
          responseData
        );
      }
      
      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: this.getHeadersObject(response.headers),
      };
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status >= 500 && retryCount > 0) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
          return this.fetchWithRetry<T>(url, config, retryCount - 1);
        }
        throw error;
      }
      
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ApiError("Request timeout", 408, "Request Timeout", null);
      }
      
      throw new ApiError(
        error instanceof Error ? error.message : "Unknown error",
        0,
        "Network Error",
        null
      );
    }
  },
  
  /**
   * Parse response body based on content type
   */
  async parseResponse(response: Response): Promise<any> {
    const contentType = response.headers.get("Content-Type") || "";
    
    if (contentType.includes("application/json")) {
      return response.json();
    }
    
    if (contentType.includes("text/")) {
      return response.text();
    }
    
    return response.blob();
  },
  
  /**
   * Convert headers to a plain object
   */
  getHeadersObject(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
};

/**
 * Error handler for API errors with toast notifications
 */
export const handleApiError = (error: unknown, fallbackMessage = "An unexpected error occurred"): void => {
  console.error(error);
  
  if (error instanceof ApiError) {
    const message = error.data?.message || error.message || fallbackMessage;
    toast.error(message);
    
    // Handle specific error codes
    if (error.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
  } else {
    toast.error(fallbackMessage);
  }
}; 