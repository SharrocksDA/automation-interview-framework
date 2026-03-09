import { responseTimeThreshold } from './config'; // Import the response time threshold from config

/**
 * Measures and validates the response time of an API request.
 * @param {() => Promise<any>} apiCall - The API call to measure.
 * @param {number} [threshold=responseTimeThreshold] - The maximum acceptable response time in milliseconds.
 * @returns {Promise<any>} The response from the API call.
 * @throws {Error} If the response time exceeds the threshold.
 */
export async function measureResponseTime(apiCall: () => Promise<any>, threshold: number = responseTimeThreshold): Promise<any> {
    const startTime = Date.now();
    const response = await apiCall(); // Execute the API call
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    if (responseTime > threshold) {
        throw new Error(`Response time exceeded threshold: ${responseTime}ms (Threshold: ${threshold}ms)`);
    }

    console.log(`Response time: ${responseTime}ms (Threshold: ${threshold}ms)`); // Optional logging
    return response;
}