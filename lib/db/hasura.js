export async function insertStats(
  token,
  { userId, videoId, watched, favourited }
) {
  const operationsDoc = `
  mutation insertStats($userId: String!, $videoId: String!, $watched: Boolean!, $favourited: Int!) {
    insert_stats(
      objects: {
        userId: $userId,
        videoId: $videoId,
        watched: $watched,
        favourited: $favourited
      }) {
      returning {
        favourited
        id
        userId
        videoId
        watched
      }
    }
  }
`;

  return await queryHasuraGQL(
    operationsDoc,
    "insertStats",
    { userId, videoId, watched, favourited },
    token
  );
}

export async function updateStats(
  token,
  { userId, videoId, watched, favourited }
) {
  const operationsDoc = `
  mutation updateStats($userId: String!, $videoId: String!, $watched: Boolean!, $favourited: Int!) {
    update_stats(
      _set: {
        favourited: $favourited,
        watched: $watched
      }
      where: {
        userId: {_eq: $userId},
        videoId: {_eq: $videoId}
      }) {
      returning {
        favourited
        id
        userId
        videoId
        watched
      }
    }
  }
`;

  return await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    { userId, videoId, watched, favourited },
    token
  );
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      userId
      videoId
      watched
      favourited
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    { userId, videoId },
    token
  );
  return response?.data?.stats;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
      publicAddress
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  return response?.data?.users?.length === 0;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
        publicAddress
      }
    }
  }
`;

  const { email, issuer, publicAddress } = metadata;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { email, issuer, publicAddress },
    token
  );
  return response;
}

export async function queryHasuraGQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
