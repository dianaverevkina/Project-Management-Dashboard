export default function reduce(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        counter: 1,
        projectId: action.payload.projectId,
      };
    case 'SUBTRACT':
      return {
        ...state,
        counter: -1,
        projectId: action.payload.projectId,
      };
    default:
      return state;
  }
}
