import {Express} from "express";
import FilloutService, {GetFormSubmissionFilters, FilterClauseType} from "../services/FilloutService";
import {logger} from "../utils/logger";

export default function filteredEndpoint(app: Express) {
    app.get('/:formId/filteredResponses', async function(req, res){
        const formFilters: GetFormSubmissionFilters = {};
        const queryParams = req.query;
        if(queryParams.afterDate) formFilters.afterDate = <string> req.query.afterDate;
        if(queryParams.beforeDate) formFilters.beforeDate = <string> req.query.beforeDate;
        if(queryParams.status) formFilters.status = <string> req.query.status;
        if(queryParams.includeEditLink) formFilters.includeEditLink = (req.query.includeEditLink == 'true');
        if(queryParams.limit) formFilters.limit = Number(req.query.limit);
        if(queryParams.offset) formFilters.offset = Number(req.query.offset);
        if(queryParams.sort) formFilters.sort = <string> req.query.sort;
        if(queryParams.filters) formFilters.filters = <FilterClauseType[]> JSON.parse(<string>req.query.filters);

        const response = await FilloutService.getFormSubmissions(req.params.formId, formFilters);
        res.send(response);
    });
}