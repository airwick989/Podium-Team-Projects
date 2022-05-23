// @ts-check

const config = {
  endpoint: "https://ridwan-hossain.documents.azure.com:443/",
  key: "Mv689TvFENtc8HfclwAvZCxU71I7emGZlDGkEpEVMpMdqHL4DHzc8ictZgz8NiQVTUeOtcb0kvTFe4HRSQFOWg==",
  databaseId: "Tasks",
  containerId: "Items",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
