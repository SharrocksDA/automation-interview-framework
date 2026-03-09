import { expect, Page, TestInfo } from "@playwright/test";
import { AccessibilityScanResults, Violation, ViolationNode } from "../types/accessabilityScanResultsType";
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * Runs accessibility tests on the given page using Axe and generates a report.
 *
 * @param page - The Playwright Page object to run the accessibility tests on.
 * @param reportName - The name of the report file to save the accessibility scan results.
 * @param violationCountMax - The maximum number of accessibility violations allowed.
 * @param testInfo - The TestInfo object to attach the accessibility scan results to.
 * @returns A promise that resolves when the accessibility tests are complete and returns the TestInfo object.
 *
 * @example
 * ```typescript
 * test('should pass accessibility tests', async ({ page }, testInfo) => {
 *     await page.goto('https://example.com');
 *     testInfo = await runAccessibilityTests(page, 'accessibility-page', 5, testInfo);
 * });
 * ```
 */
export async function runAccessibilityTests(page: Page, reportName: string, violationCountMax: number, testInfo: TestInfo): Promise<TestInfo> {
    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag22a', 'wcag22aa'])
        .analyze();

    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
    });
    saveAccessibilityReport(accessibilityScanResults, reportName);
    expect(accessibilityScanResults.violations.length).toBeLessThanOrEqual(violationCountMax);
    return testInfo;
}

/**
 * Saves an accessibility report to an HTML file if there are any violations.
 *
 * @param accessibilityScanResults - The results of the accessibility scan containing violations.
 * @param url - The URL of the page that was scanned.
 * @returns A promise that resolves when the report has been saved.
 *
 * @example
 * ```typescript
 * const url = 'http://example.com';
 * await saveAccessibilityReport(scanResults, url);
 * // Accessibility report written to /c:/work/playwrightUtils/test-results/accessibility-report-http:example.com.html
 * ```
 */
function saveAccessibilityReport(accessibilityScanResults: AccessibilityScanResults, url: string): void {
    if (accessibilityScanResults.violations.length > -1) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const reportPath = require('path').resolve(__dirname, '../test-results', `accessibility-report-${url.replace('/', '')}.html`);
        const violationsHtml = accessibilityScanResults.violations.map((violation: Violation) => `
          <h2>${violation.id}</h2>

        <p>${violation.description}</p>

         <ul>

              ${violation.nodes.map((node: ViolationNode) => `

                   <li>

                        <strong>Target:</strong> ${node.target.join(', ')}

                         <br>

                          <strong>HTML:</strong> ${node.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}

                           <br>

                            <strong>Failure Summary:</strong> ${node.failureSummary}

                         </li>

                      `).join('')}

                   </ul>

                </div>

        </ul>
    </div>
`).join('');

        const htmlContent = `
    <html>
        <head>
            <title>Accessibility Report</title>
        </head>
        <body>
            <h1>Accessibility Violations</h1>
            ${violationsHtml}
        </body>
    </html>
`;
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const dir = require('path').dirname(reportPath);
        console.log(`Accessibility report written to ${reportPath}`);
        try {
            if (!fs.existsSync(dir)) {
                console.log(`Directory does not exist. Creating directory: ${dir}`);
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(reportPath, htmlContent, 'utf8');
            console.log(`Accessibility report successfully written to ${reportPath}`);
        } catch (error) {
            console.error(`Failed to write accessibility report: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}