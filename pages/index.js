import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router'

const Home = ({todos}) => {
  const router = useRouter()
  const { username } = useUser();
  const [body, setBody] = useState("")
  const [completed, setCompleted] = useState("false")
  const [dateBy, setDateBy] = useState("")
  const date = new Date().toISOString().slice(0, 10)
  const [pet, setPet] = useState("Fire")
  const [res, setRes] = useState("")

  const traitList = [
    "Cute",
    "Loyal",
    "Lazy",
    "Playful",
    "Friendly",
    "Curious",
    "Lonely",
    "Loud",
    "Quiet",
    "Silly",
    "Sleepy",
  ]

  const trait = traitList[Math.floor(Math.random() * traitList.length)]

  const postData = () => {
    axios.post("https://api.rainoto.com/todos", {
      body,
      completed,
      date,
      dateBy,
      pet,
      trait,
      username,
    })
    .then(res => {
      setRes(res.data)
    });
  }

  return (
    <div>
        <nav className="m-6 flex justify-between">
          <h1 className="text-2xl font-bold">Rainoto</h1>
          <Link href="/pets"><a className="text-green-700">See your pets</a></Link>
        </nav>
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <form onSubmit={postData}>
            <div className="mb-4">
              {/* body */}
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                  Body
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="body"
                onInput={(e) => setBody(e.target.value)}
                type="text"
                placeholder="Enter a body"
              />
            </div>
            
            <div className="mb-4">
              {/* dateBy */}
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateBy">
                To be completed by
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dateBy"
                onInput={(e) => setDateBy(e.target.value)}
                type="date"
                placeholder="Enter a date"
              />
            </div>
            <div className="mb-4">
              {/* pet */}
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pet">
                Pick a pet you want to adopt
              </label>
              {/* Dropdown menu for pet/Select */}
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pet"
                onChange={(e) => setPet(e.target.value)}
              >
                <option value="">Select a pet</option>
                <option value="Desert">Desert</option>
                <option value="Blue">Blue</option>
                <option value="Fire">Fire</option>
                <option value="Forest">Forest</option>
                <option value="Gold">Gold</option>
                <option value="Ice">Ice</option>
                <option value="Pink">Pink</option>
                <option value="ReallyPink">Really Pink</option>
                <option value="Space-Ish">Space</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          <p className="py-4"><span className="font-bold">Tip:</span> the pet will become available when you complete the todo, if you dont complete the todo on time the pet will be lost forever!</p>
          </form>
        </div>
      </div>
      <div className="flex my-8 items-center flex-col">
        {
          todos.map(todo => {
            {
              if (todo.username == username) {
                if (todo.completed == true) {
                } else if (todo.dateBy < new Date().toISOString().slice(0, 10)) {
                  return (
                    <div className="bg-red-100 border-red-400 w-10/12 h-full flex flex-row justify-between my-4 text-red-700 px-4 py-3 rounded relative" key={todo._id}>
                      <p className="font-bold">{todo.body}</p>
                      <p className="text-lg">💀</p>
                      <button className="" onClick={() => {
                        axios.delete('https://api.rainoto.com/todos/' + todo._id, {
                        })
                        .then(res => {
                          router.reload()
                        })
                      }}>
                        Delete pet
                      </button>
                    </div>
                  )
                }
                else {
                  return (
                    <div className="bg-gray-100 border-gray-400 w-10/12 h-full flex flex-row justify-between my-4 text-gray-700 px-4 py-3 rounded relative" key={todo._id}>
                      <p className="font-bold">{todo.body}</p>
                      <button className="" onClick={() => {
                        axios.put('https://api.rainoto.com/todos/' + todo._id, {
                          Headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
                          },
                          completed: true
                        })
                        .then(res => {
                          router.reload()
                        })
                      }}>
                        Mark as completed
                      </button>
                    </div>
                  )
                }
              }
            }
          })
        }
      </div>
      <p>{res}</p>
    </div>
  );
}

export async function getServerSideProps() {
  /* 
  * Note: I made this in a hurry, so it's not super pretty or even usable in production. Don't judge me based on this, provide me with a test and I'll write production ready code.
  */
  const res = await axios.get('https://api.rainoto.com/todos');
  return {
    props: {
      todos: res.data
    },
  };
}

export default Home;