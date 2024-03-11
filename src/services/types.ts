export interface Responses {
    responses: Response[];
    totalResponses: number;
    pageCount: number;
}
export interface Response {
    [key: string]: any;

    // submissionId: string;
    // submissionTime: string;
}

export interface FormDetail {
    id: string;
    name: string;
    type: string;
    value: string;
}