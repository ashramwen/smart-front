window.chartsMeta = [
  /*
  {
      "name": "27db84fd-9c92-3ec9-3163-333349f202a9",
      "dataset": {
          "complex": false,
          "name": "Meeting Room 8-7-9W PM2.5",
          "options": {
              "level": 0,
              "query": {
                "_kii_agg_name": "电量损耗",
                "_kii_query_path": "/493e83c9/_search",
                "query": {
                  "filtered": {
                    "query": {
                      "query_string": {
                        "query": "*",
                        "analyze_wildcard": true
                      }
                    },
                    "filter": {
                      "bool": {
                        "must": [
                          {
                            "terms": {
                              "state.target": ["th.aba700e36100-0f8a-6e11-efb9-0c3a21ca", "th.aba700e36100-0f8a-6e11-fdc9-0ee944af"]
                            }
                          },
                          {
                            "script": {
                              "script": "_source.state != null && _source.state.date && new Date(_source.state.date).getHours()<20;"
                            }
                          }
                        ],
                        "must_not": []
                      }
                    }
                  }
                },
                "size": 0,
                "aggs": {
                  "calc": {
                    "_kii_agg_chart": "line",
                    "aggs": {
                      "byThingGroup": {
                        "enum": {
                          "keys": ["e1"],
                          "field": "state.target",
                          "values": [["th.aba700e36100-0f8a-6e11-efb9-0c3a21ca"]]
                        },
                        "aggs": {
                          "MaxKwh": {
                            "max": {
                              "field": "state.Wh"
                            },
                            "_kii_selected": true
                          },
                          "MinKwh": {
                            "min": {
                              "field": "state.Wh"
                            },
                            "_kii_selected": true
                          },
                          "KwnD": {
                            "_kii_agg_field_name": "电量消耗",
                            "script": "doc['MaxKwh'] - doc['MinKwh']",
                          }
                        }
                      },
                      "test": {
                        "_kii_agg_field_name": "点灯电量损耗",
                        "script": "(doc['byThingGroup'].e1.MaxKwh - doc['byThingGroup'].e1.MinKwh) - (doc['byThingGroup'].e2.MaxKwh - doc['byThingGroup'].e2.MinKwh)"
                      }
                    },
                    "date_histogram": {
                        "field": "state.date",
                        "interval": "hour"
                    }
                  }
                }
              },
              "chartType": "pie",
              "interval": 1,
              "timeUnit": "H"
          },
          "description": "",
          "widgetSetting": {
              "size": {
                  "x": 3,
                  "y": 2
              },
              "position": {
                  "col": 3,
                  "row": 4
              }
          }
      }
  },
  */
  {
    "dataset": {
      "complex": false,
      "name": "CO & CO2",
      "options": {
        "level": 0,
        "query": {
          "_kii_agg_name": "电量损耗",
          "_kii_query_path": "/493e83c9/_search",
          "query": {
            "filtered": {
              "query": {
                "query_string": {
                  "query": "*",
                  "analyze_wildcard": true
                }
              },
              "filter": {
                "bool": {
                  "must": [
                    {
                      "terms": {
                        "state.target": ["th.f83120e36100-870b-6e11-b1d8-034dff1a"]
                      }
                    }
                  ],
                  "must_not": []
                }
              }
            }
          },
          "size": 0,
          "aggs": {
            "calc": {
              "_kii_agg_chart": "line",
              "aggs": {
                "CO2": {
                  "avg": {
                    "field": "state.CO2"
                  },
                  "_kii_series_name": "CO2",
                  "_kii_selected": true,
                },
                "CO": {
                  "avg": {
                    "field": "state.Bri"
                  },
                  "_kii_series_name": "CO",
                  "_kii_selected": true
                }
              },
              "date_histogram": {
                "field": "state.date",
                "interval": "hour"
              }
            }
          }
        },
        "chartType": "pie",
        "interval": 1,
        "timeUnit": "d"
      },
      "description": "",
      "widgetSetting": {
        "size": {
          "x": 6,
          "y": 2
        },
        "position": {
          "col": 0,
          "row": 0
        }
      }
    }
  },
  {
    "dataset": {
      "complex": false,
      "name": "CO2 VS CO",
      "options": {
        "level": 0,
        "query": {
          "_kii_agg_name": "电量损耗",
          "_kii_query_path": "/493e83c9/_search",
          "query": {
            "filtered": {
              "query": {
                "query_string": {
                  "query": "*",
                  "analyze_wildcard": true
                }
              },
              "filter": {
                "bool": {
                  "must": [
                    {
                      "terms": {
                        "state.target": ["th.f83120e36100-870b-6e11-b1d8-034dff1a"]
                      }
                    }
                  ],
                  "must_not": []
                }
              }
            }
          },
          "size": 0,
          "aggs": {
            "calc": {
              "_kii_agg_chart": "line",
              "aggs": {
                "CO2": {
                  "max": {
                    "field": "state.CO2"
                  },
                  "_kii_series_name": "CO2",
                  "_kii_selected": true,
                  "_kii_agg_field_name": "浓度"
                }
              },
              "histogram": {
                "field": "state.Bri",
                "interval": 10
              }
            }
          }
        },
        "chartType": "pie",
        "interval": 1,
        "timeUnit": "d"
      },
      "description": "",
      "widgetSetting": {
        "size": {
          "x": 3,
          "y": 2
        },
        "position": {
          "col": 0,
          "row": 3
        }
      }
    }
  },
  {
    "dataset": {
      "complex": false,
      "name": "CO2 VS CO",
      "options": {
        "level": 0,
        "query": {
          "_kii_agg_name": "电量损耗",
          "_kii_query_path": "/493e83c9/_search",
          "query": {
            "filtered": {
              "query": {
                "query_string": {
                  "query": "*",
                  "analyze_wildcard": true
                }
              },
              "filter": {
                "bool": {
                  "must": [
                    {
                      "terms": {
                        "state.target": ["th.f83120e36100-870b-6e11-b1d8-034dff1a"]
                      }
                    }
                  ],
                  "must_not": []
                }
              }
            }
          },
          "size": 0,
          "aggs": {
            "calc": {
              "_kii_agg_chart": "pie",
              "aggs": {
                "CO2": {
                  "max": {
                    "field": "state.CO2"
                  },
                  "_kii_series_name": "CO2",
                  "_kii_selected": true,
                  "_kii_agg_field_name": "浓度"
                }
              },
              "range": {
                "field": "state.Bri",
                "ranges": [
                  { "key": "<50", "to": 50 },
                  { "key": "50 - 100", "from": 50, "to": 100 },
                  { "key": "100", "from": 100 }
                ]
              }
            }
          }
        },
        "chartType": "pie",
        "interval": 1,
        "timeUnit": "d"
      },
      "description": "",
      "widgetSetting": {
        "size": {
          "x": 3,
          "y": 2
        },
        "position": {
          "col": 4,
          "row": 3
        }
      }
    }
  }
];