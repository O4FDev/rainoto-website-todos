import { useUser } from "@clerk/nextjs";
import axios from "axios";

const Pets = ({ todos }) => {
    const { username } = useUser();
    return (
        // A grid of cards containing the pet and information about the todo, the pet should be in big
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
            todos.map(todo => {
                if(todo.username == username ) {
                    if(todo.completed == true) {
                        return (
                            <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 h-64 flex justify-center items-center">
                                <img src={"https://dgcd941xto4f9.cloudfront.net/" + todo.pet + ".png"} alt={todo.pet} className="w-20" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{todo.pet}</div>
                                    <p className="text-gray-700 text-base">{todo.trait}</p>
                                </div>
                            </div>
                        )
                    }
                }
            })
            }
        </div>
    )
}

export async function getStaticProps() {
    const res = await axios.get('https://api.rainoto.com/todos');
    return {
      props: {
        todos: res.data
      },
    };
  }

export default Pets;