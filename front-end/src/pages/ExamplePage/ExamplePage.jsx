// Should remove this file
import { useMutation, useQuery } from "@apollo/client/react";
import { LOGIN } from "../../graphql/mutations/dummy.mutation";
import { GET_PROFILE } from "../../graphql/queries/dummy.query";

export const ExamplePage = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const getProfile = useQuery(GET_PROFILE);

  console.log("Profile result:",getProfile.data);

  const handleLogin = async () => {
    try {
      const result = await login({
        variables: {
          input: {
            email: "user1@gmail.com",
            password: "luckymoney",
          }
        },
      });

      console.log("Login result:", result.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="text-1xl font-bold">
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}
