/**
 * Converts ISO date string (or null/undefined) to YYYY-MM-DD format for HTML input[type="date"].
 */
export const toFormDate = (isoString) => {
    if (!isoString) return '';
    try {
        // Ensure only date part is kept (YYYY-MM-DD)
        return new Date(isoString).toISOString().split('T')[0];
    } catch {
        return '';
    }
};

/**
 * Converts YYYY-MM-DD string (or null/undefined) to ISO date string for the backend.
 */
export const toISODate = (dateString) => {
    if (!dateString) return null;
    try {
        // Creates ISO string for backend
        return new Date(dateString).toISOString();
    } catch {
        return null;
    }
};