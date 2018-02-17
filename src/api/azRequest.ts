import { AzQueryConfig } from "./azQueryConfig";

interface AzRequest {
  url: string;
  options: RequestInit;
}

const buildURL = (config: AzQueryConfig): string => {
  const queryRoot = `${config.protocol}://${config.serviceName}.${config.serviceDomain}/`;
  const queryPath = `indexes/${config.serviceIndex}/docs?api-version=${config.apiVer}`;
  const queryPayload = config.searchField ? `&search="${config.searchField}"` : "";    
  const queryLimit = config.limit ? `&$top=${config.limit}` : "";
  const queryFacets = config.facets ? config.facets.map(facet => `&facet=${facet}`).join("") : "";
  
  return queryRoot + queryPath + queryPayload + queryLimit + queryFacets;
}

const buildRequest = (config: AzQueryConfig): AzRequest => ({
  url: buildURL(config),
  options: {
    method: config.method,
    headers: {
      "Content-Type": config.contentType,
      "api-key": config.apiKey,
    }
  }
});

export { buildRequest, AzRequest }; 
