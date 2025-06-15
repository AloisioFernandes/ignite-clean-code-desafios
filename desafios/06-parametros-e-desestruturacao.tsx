function updateUserRoute({ body, params }) {
  updateUserController({ data: body, params });
}

function updateUserController({ data, params }) {
  const { name, email, password } = data;
  const { id } = params;

  userRepository.update({ data: { name, email, password }, params: { id } });
}

const userRepository = {
  update: ({ data, params }) => {},
};
