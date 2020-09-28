const optionsForGet = (headers, method) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  return {
    headers: {
      ...defaultHeaders,
      ...headers
    },
    method
  };
};

const optionsForPost = (body, headers) => {
  const headersForReq = optionsForGet(headers);
  return {
    ...headersForReq,
    body: JSON.stringify(body),
    method: 'POST',
  };
};

const getOptions = (body, method, headers) => {
  if (method === 'GET' || method === 'DELETE') return optionsForGet(headers, method);
  return optionsForPost(body, headers);
};

const fetchReq = async (url, body, method, headers) => {
  const res = await fetch(url, getOptions(body, method, headers));
  return await res.json();
};

const apiCall = (action) => {
  switch (action.type) {
    case 'SIGNUP':
      return fetchReq('/signup', action.body, 'POST');
    case 'SIGNIN':
      return fetchReq('/signin', action.body, 'POST');
    case 'CREATE_POST':
      return fetchReq('/createPost', action.body, 'POST', action.headers);
    case 'ALL_POSTS':
      return fetchReq('/allPosts', action.body, 'GET', action.headers);
    case 'MY_POSTS':
      return fetchReq('/myPosts', action.body, 'GET', action.headers);
    case 'LIKE':
      return fetchReq('/like', action.body, 'POST', action.headers);
    case 'UN_LIKE':
      return fetchReq('/unLike', action.body, 'POST', action.headers);
    case 'COMMENT':
      return fetchReq('/comment', action.body, 'POST', action.headers);
    case 'DELETE_POST':
      return fetchReq(`/deletePost/${action.postId}`, action.body, 'DELETE', action.headers);
    case 'USER_PROFILE':
      return fetchReq(`/userProfile/${action.userId}`, action.body, 'GET', action.headers);
    case 'FOLLOW':
      return fetchReq('/follow', action.body, 'POST', action.headers);
    case 'UN_FOLLOW':
      return fetchReq('/unFollow', action.body, 'POST', action.headers);
    case 'FOLLOWING_POSTS':
      return fetchReq('/followingPosts', action.body, 'GET', action.headers);
    case 'ALL_COMMENTS':
      return fetchReq(`/allComments/${action.postId}`, action.body, 'GET', action.headers);
    default:
      return new Promise((resolve, reject) => reject());
  }
};

export default apiCall;
