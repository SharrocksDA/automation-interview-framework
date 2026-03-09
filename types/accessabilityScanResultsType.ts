export type ViolationNode = {
    target: string[];
    html: string;
    failureSummary: string;
};

export type Violation = {
    id: string;
    description: string;
    nodes: ViolationNode[];
};

export type AccessibilityScanResults = {
    violations: Violation[];
};