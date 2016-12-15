window.chartsMeta = [
// CO2 & CO
  {
    "dataset": {
      "complex": false,
      "name": "CO & CO2 (ml/m³)",
      "currentMethod": "avg",
      "methods": [
        {
          name: 'min',
          func: function(query){
            query.aggs.calc.aggs.CO2.min = {
              "field": "state.CO2"
            };
            delete query.aggs.calc.aggs.CO2.avg;
            delete query.aggs.calc.aggs.CO2.max;

            query.aggs.calc.aggs.CO.min = {
              "field": "state.CO"
            };
            delete query.aggs.calc.aggs.CO.avg;
            delete query.aggs.calc.aggs.CO.max;
          }
        },
        {
          name: 'max',
          func: function(query){
            query.aggs.calc.aggs.CO2.max = {
              "field": "state.CO2"
            };
            delete query.aggs.calc.aggs.CO2.avg;
            delete query.aggs.calc.aggs.CO2.min;
  
            query.aggs.calc.aggs.CO.max = {
              "field": "state.CO"
            };
            delete query.aggs.calc.aggs.CO.avg;
            delete query.aggs.calc.aggs.CO.min;
          }
        }, 
        {
          name: 'avg',
          func: function(query){
            query.aggs.calc.aggs.CO2.avg = {
              "field": "state.CO2"
            };
            delete query.aggs.calc.aggs.CO2.min;
            delete query.aggs.calc.aggs.CO2.max;
  
            query.aggs.calc.aggs.CO.avg = {
              "field": "state.CO"
            };
            delete query.aggs.calc.aggs.CO.min;
            delete query.aggs.calc.aggs.CO.max;
          }
        }
      ],
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
                        "state.target": ["th.aba700e36100-011a-6e11-230c-038b629d"]
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
                    "field": "state.CO"
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
  
  // TEMPERATURE
  {
    "dataset": {
      "complex": false,
      "name": "Temperature (℃)",
      "currentMethod": "avg",
      "methods": [
        {
          name: 'min',
          func: function(query){
            query.aggs.calc.aggs.TEP.min = {
              "field": "state.TEP"
            };
            delete query.aggs.calc.aggs.TEP.avg;
            delete query.aggs.calc.aggs.TEP.max;
          }
        },
        {
          name: 'max',
          func: function(query){
            query.aggs.calc.aggs.TEP.max = {
              "field": "state.TEP"
            };
            delete query.aggs.calc.aggs.TEP.avg;
            delete query.aggs.calc.aggs.TEP.min;
          }
        }, 
        {
          name: 'avg',
          func: function(query){
            query.aggs.calc.aggs.TEP.avg = {
              "field": "state.TEP"
            };
            delete query.aggs.calc.aggs.TEP.min;
            delete query.aggs.calc.aggs.TEP.max;
          }
        }
      ],
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
                        "state.target": ["th.aba700e36100-011a-6e11-230c-038b629d"]
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
                "TEP": {
                  "avg": {
                    "field": "state.TEP"
                  },
                  "_kii_series_name": "TEP",
                  "_kii_selected": true,
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
  // PM 10 & PM2.5
  {
    "dataset": {
      "complex": false,
      "name": "PM 10 & PM2.5 (ml/m³)",
      "currentMethod": "avg",
      "methods": [
        {
          name: 'min',
          func: function(query){
            query.aggs.calc.aggs.PM10.min = {
              "field": "state.PM10"
            };
            delete query.aggs.calc.aggs.PM10.avg;
            delete query.aggs.calc.aggs.PM10.max;

            query.aggs.calc.aggs.PM25.min = {
              "field": "state.PM25"
            };
            delete query.aggs.calc.aggs.PM25.avg;
            delete query.aggs.calc.aggs.PM25.max;
          }
        },
        {
          name: 'max',
          func: function(query){
            query.aggs.calc.aggs.PM10.max = {
              "field": "state.PM10"
            };
            delete query.aggs.calc.aggs.PM10.avg;
            delete query.aggs.calc.aggs.PM10.min;
  
            query.aggs.calc.aggs.PM25.max = {
              "field": "state.PM25"
            };
            delete query.aggs.calc.aggs.PM25.avg;
            delete query.aggs.calc.aggs.PM25.min;
          }
        }, 
        {
          name: 'avg',
          func: function(query){
            query.aggs.calc.aggs.PM10.avg = {
              "field": "state.PM10"
            };
            delete query.aggs.calc.aggs.PM10.min;
            delete query.aggs.calc.aggs.PM10.max;
  
            query.aggs.calc.aggs.PM25.avg = {
              "field": "state.PM25"
            };
            delete query.aggs.calc.aggs.PM25.min;
            delete query.aggs.calc.aggs.PM25.max;
          }
        }
      ],
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
                        "state.target": ["th.aba700e36100-011a-6e11-230c-038b629d"]
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
                "PM10": {
                  "avg": {
                    "field": "state.PM10"
                  },
                  "_kii_series_name": "PM10",
                  "_kii_selected": true,
                },
                "PM25": {
                  "avg": {
                    "field": "state.PM25"
                  },
                  "_kii_series_name": "PM25",
                  "_kii_selected": true,
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
  // HUMANITY
  {
    "dataset": {
      "complex": false,
      "name": "Humanity (°)",
      "currentMethod": "avg",
      "methods": [
        {
          name: 'min',
          func: function(query){
            query.aggs.calc.aggs.HUM.min = {
              "field": "state.HUM"
            };
            delete query.aggs.calc.aggs.HUM.avg;
            delete query.aggs.calc.aggs.HUM.max;
          }
        },
        {
          name: 'max',
          func: function(query){
            query.aggs.calc.aggs.HUM.max = {
              "field": "state.HUM"
            };
            delete query.aggs.calc.aggs.HUM.avg;
            delete query.aggs.calc.aggs.HUM.min;
          }
        }, 
        {
          name: 'avg',
          func: function(query){
            query.aggs.calc.aggs.HUM.avg = {
              "field": "state.HUM"
            };
            delete query.aggs.calc.aggs.HUM.min;
            delete query.aggs.calc.aggs.HUM.max;
          }
        }
      ],
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
                        "state.target": ["th.aba700e36100-011a-6e11-230c-038b629d"]
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
                "HUM": {
                  "avg": {
                    "field": "state.HUM"
                  },
                  "_kii_series_name": "HUM",
                  "_kii_selected": true,
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
  // CO2 VS TEMPERATURE
  {
    "dataset": {
      "complex": false,
      "name": "CO2 Against Temperature (ml/m³)",
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
                        "state.target": ["th.aba700e36100-011a-6e11-230c-038b629d"]
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
                "field": "state.TEP",
                "interval": 1
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
      "name": "CO2 Density (ml/m³)",
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
                        "state.target": ["th.aba700e36100-011a-6e11-230c-038b629d"]
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
                "field": "state.CO2",
                "ranges": [
                  { "key": "<5000", "to": 5000 },
                  { "key": "5000 - 6000", "from": 5000, "to": 6000 },
                  { "key": "6000", "from": 6000 }
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