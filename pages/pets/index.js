import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";

const Pets = ({ todos }) => {
    const { username } = useUser();
    return (
        <div>
            <nav className="m-6 flex justify-between">
                <Link href="/"><a className="text-2xl font-bold">Rainoto</a></Link>
            </nav>
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
        </div>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('https://api.rainoto.com/todos');
    return {
      props: {
        todos: res.data
      },
    };
  }

export default Pets;