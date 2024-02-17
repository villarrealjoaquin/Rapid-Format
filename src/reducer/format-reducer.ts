interface State {
  fromFormat: string;
  toFormat: string;
  query: string;
  result: string;
  error: string;
}

export const initialState: State = {
  fromFormat: "obj",
  toFormat: "json",
  query: "",
  result: "",
  error: "",
}

export const reducer = (state: State, action: any) => {
  const { type, payload } = action;

  switch(type) {
    case "SET_FROM_FORMAT": {
      return {
        ...state,
        fromFormat: payload
      }
    }
    case "SET_TO_FORMAT": {
      return {
        ...state,
        toFormat: payload
      }
    }
  }
  return state;
}
