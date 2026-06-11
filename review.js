  /** this is for normal message*/
  {
  index: 0,
  message: {
    role: 'assistant',
    content: 'Hello! I’m UtsavBOt. How can I help you today?',
    refusal: null,
    annotations: []
  },
  finish_reason: 'stop'
}

/**this is when have tool call */
{
  index: 0,
  message: {
    role: 'assistant',
    content: null,
    tool_calls: [ [Object] ],
    refusal: null,
    annotations: []
  },
  finish_reason: 'tool_calls'
}

/**tool calling */
[{"id":"call_NKhhajhVptTuxvVP4UxeckZI",
  "type":"function",
  "function":{"name":"get_weather","arguments":"{\"city\":\"Mumbai\"}"}
}]