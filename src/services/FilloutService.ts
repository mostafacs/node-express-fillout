import BaseRestClient from "../utils/BaseRestClient";
import {getValue} from "../utils/config-provider";
import {Responses, Response} from "./types"
class FilloutService {


    private static restClient: BaseRestClient;

    constructor() {
        if(!FilloutService.restClient) {
            FilloutService.restClient = new BaseRestClient(getValue('fillout-api-url'), getValue('fillout-api-key'));
        }
    }

    async getFormSubmissions(formId: string, filters: GetFormSubmissionFilters) {
        const path = `/v1/api/forms/${formId}/submissions`;
        const filloutParamsKeys = Object.keys(filters).filter(k => k !== 'filters');
        const filloutParams: any = {};
        // @ts-ignore
        filloutParamsKeys.forEach(key =>  filloutParams[key] = filters[key] );
        const axiosResponse = await FilloutService.restClient.get<Responses>(path, filloutParams);
        if(filters.filters) {
            /**
             * Probably looping to get the result
             */
            const filteredResponses = this.applyFilters(axiosResponse.data.responses, filters.filters);
            let totalResponse = filteredResponses.length;
            let pageCount = 1;
            if (filteredResponses.length == 0) {
                pageCount = 0;
            }
            return {responses: filteredResponses, totalResponses: totalResponse, pageCount: pageCount};
        }
        return axiosResponse.data;
    }

    private applyFilters(responses: Response[], filters: FilterClauseType[]) {

        const result = [];
        for(let response of responses) {
            const dataKeys = Object.keys(response);
            const filteredResponse = {};
            dataKeys.forEach(key => {
                if (response[key] && Array.isArray(response[key])) {
                    const formDetailsArray = response[key];
                    let allmatched = true;
                    for (const filter of filters) {
                        let matched = false;
                        for (const obj of formDetailsArray) {
                            if (obj['id'] === filter.id) {
                                matched = this.match(obj, filter);
                                if (matched) break; // exist the loop - one is matched - match the next filter.
                            }
                        }
                        // IF < a filter not matched > -- We don't want to check the other filters due to "AND" between filters.
                        if (!matched) {
                            allmatched = false; // exit the loop
                            break;
                        }
                    }
                    if (allmatched) {
                        // @ts-ignore
                        filteredResponse[key] = formDetailsArray;
                    }
                }
            });
            if(Object.keys(filteredResponse).length > 0) {
                result.push(filteredResponse);
            }
        }
        return result;
    }

    private match(obj: any, filter: FilterClauseType) {
        switch (filter.condition) {
            case "equals":
                return obj.value === filter.value;
            case "does_not_equal":
                return obj.value !== filter.value;
            case "greater_than":
                return obj.value > filter.value;
            case "less_than":
                return obj.value < filter.value;
            default:
                throw new Error(`unexpected condition ${filter.condition}`);
        }
    }

}

export type FilterClauseType = {
    id: string;
    condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
    value: number | string;
}

// each of these filters should be applied like an AND in a "where" clause
// in SQL
export interface GetFormSubmissionFilters {
    afterDate?: string;
    beforeDate?: string;
    limit?: number;
    offset?: number;
    status?: 'in_progress'|'finished'|string;
    includeEditLink?: boolean;
    sort?: 'asc'|'desc'|string
    filters?: FilterClauseType[]
}
export default new FilloutService();