/**
 * Storage utility wrapper for localStorage operations
 * Provides a clean abstraction with error handling and type safety
 */

export interface StorageInterface {
  get(key: string): string | null;
  getJSON<T>(key: string): T | null;
  set(key: string, value: string): void;
  setJSON<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
}

class LocalStorageWrapper implements StorageInterface {
  /**
   * Get a string value from localStorage
   * @param key - The storage key
   * @returns The stored value or null if not found or error occurred
   */
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from localStorage with key "${key}":`, error);
      return null;
    }
  }

  /**
   * Get a JSON value from localStorage and parse it
   * @param key - The storage key
   * @returns The parsed value or null if not found, invalid JSON, or error occurred
   */
  getJSON<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`Failed to get and parse JSON from localStorage with key "${key}":`, error);
      return null;
    }
  }

  /**
   * Set a string value in localStorage
   * @param key - The storage key
   * @param value - The value to store
   */
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set item in localStorage with key "${key}":`, error);
    }
  }

  /**
   * Set a JSON value in localStorage (automatically stringified)
   * @param key - The storage key
   * @param value - The value to store (will be JSON.stringify'd)
   */
  setJSON<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`Failed to set JSON item in localStorage with key "${key}":`, error);
    }
  }

  /**
   * Remove an item from localStorage
   * @param key - The storage key to remove
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from localStorage with key "${key}":`, error);
    }
  }

  /**
   * Clear all items from localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  /**
   * Check if a key exists in localStorage
   * @param key - The storage key to check
   * @returns true if the key exists, false otherwise
   */
  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.warn(`Failed to check if key "${key}" exists in localStorage:`, error);
      return false;
    }
  }
}

// Export a singleton instance
export const storage = new LocalStorageWrapper();

// Export the class for testing purposes
export { LocalStorageWrapper };
