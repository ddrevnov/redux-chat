export default ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, fromBackground, types = [null, null, null], ...rest } = action;
  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  const nextIfHaveAction = (subAction) => {
    if (subAction && subAction.type) {
      return next(subAction);
    }
    return null;
  };
  next({ ...rest, type: REQUEST });

  return promise.then(
    result => nextIfHaveAction({
      ...rest,
      result: result.data,
      type: SUCCESS,
    }),
    (error) => {
      nextIfHaveAction({ ...rest, error, type: FAILURE });
      throw error;
    },
  );
};
