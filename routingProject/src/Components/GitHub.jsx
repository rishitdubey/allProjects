import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const DisplayUser = ({ userDetails }) => {
  return (
    <>
      <div className=" flex flex-col justify-center">

        <div className="text-blue-200 text-2xl ">
          {/* To display name */}
          {userDetails.name || userDetails.login}<br />
        </div>

        <img src={userDetails.avatar_url} alt="User avatar"
          className="h-80 w-80 rounded-4xl" />

      </div>

    </>
  )

}

const InputUserId = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/github/${userid}`)

  }

  const [userid, setUserid] = useState("");
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <label htmlFor="userid"
          className="text-blue-200 ">
          Provide your GitHub User Id:</label>
        <br />
        <input
          className="border border-blue-100 rounded-2xl"
          value={userid}
          type="text" name="userid" id="userid"
          onChange={(e) => {
            e.preventDefault();
            setUserid(e.target.value);

          }} />
        <br />
        <button
          type="submit"
          className="border border-blue-100 text-blue-300 rounded-2xl p-2 mt-1"
        >Submit</button>

      </form>
    </div>
  )
}

const GitHub = () => {

  const { userid } = useParams();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (userid) {
      fetch(`https://api.github.com/users/${userid}`)
        .then(res => res.json())
        .then(res => setUserDetails(res))
    }
  }, [userid])

  return (
    <>
      <div className="bg-gray-800 h-screen px-4">
        {/* To display user details */}
        {userDetails.id ? <DisplayUser userDetails={userDetails} /> : <InputUserId />}
      </div>
    </>
  )
}
export default GitHub;