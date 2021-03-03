import { buildResultList, buildResultTemplatesManager, buildSearchBox, HeadlessEngine, Result, searchAppReducers, AnalyticsActions } from "@coveo/headless";

export const searchEngine = new HeadlessEngine({
  configuration: {
    accessToken: 'xx4507af76-c23b-4978-94fa-097d08246a6d',
    organizationId: 'xerosandbox-rtm6mi2mo33g4wtgap34uqsnue',
    search: {
      pipeline: 'Apps Pipeline'
    }
  },
  reducers: searchAppReducers,
});

searchEngine.enableAnalytics()

export const searchBox = buildSearchBox(searchEngine);

export const searchResultList = buildResultList(searchEngine);

export const resultTemplateManager = buildResultTemplatesManager(
  searchEngine
);



resultTemplateManager.registerTemplates({
  conditions:[],
  content: (result: Result) => (
    <div key={result.uniqueId} onClick={(e) => searchEngine.dispatch(AnalyticsActions.logClickEvent({evt: 'documentOpen', result}))}>{result.title}</div>
  )
})