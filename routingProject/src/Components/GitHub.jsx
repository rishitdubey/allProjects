import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

const GitHub = () => {

  const { userid } = useParams();
  const [userDetails, setUserDetails] = useState({});

  if (userid) {
    useEffect(() => {
      fetch(`https://api.github.com/users/${userid}`)
        .then(res => res.json())
        .then(res => setUserDetails(res))
    }, [])
  }

  return (
    <>
      <div className="bg-gray-800 px-4">
        <div className="text-blue-200 text-2xl ">
          {userid ? userDetails.name : "Please provide a GitHub user id"}<br />
        </div>
        <div>
          <img src= {userDetails.avatar_url} alt="User avatar"/>
        </div>
      </div>
    </>
  )
}

export default GitHub;